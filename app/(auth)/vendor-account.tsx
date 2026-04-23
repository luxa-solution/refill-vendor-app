import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useAuthStore } from "@/features/auth/store";
import { Button } from "@/shared/components";

type SetupStep = 1 | 2;

type GasOfferForm = {
  id: string;
  gasType: string;
  pricePerKg: string;
};

type VendorImageForm = {
  id: string;
  uri: string;
  fileName: string;
  mimeType: string;
};

const buildId = () => Math.random().toString(36).slice(2, 10);

export default function VendorAccountScreen() {
  const router = useRouter();
  const setVendorProfileComplete = useAuthStore(
    (state) => state.setVendorProfileComplete,
  );
  const [step, setStep] = useState<SetupStep>(1);

  const [vendorName, setVendorName] = useState("");
  const [vendorDescription, setVendorDescription] = useState("");
  const [vendorAvailable, setVendorAvailable] = useState(true);

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);

  const [gasOffers, setGasOffers] = useState<GasOfferForm[]>([
    { id: buildId(), gasType: "LPG", pricePerKg: "" },
  ]);
  const [vendorImages, setVendorImages] = useState<VendorImageForm[]>([]);

  const handleOfferChange = (
    id: string,
    key: "gasType" | "pricePerKg",
    value: string,
  ) => {
    setGasOffers((prev) =>
      prev.map((offer) =>
        offer.id === id
          ? {
              ...offer,
              [key]:
                key === "pricePerKg" ? value.replace(/[^\d.]/g, "") : value,
            }
          : offer,
      ),
    );
  };

  const addGasOffer = () => {
    setGasOffers((prev) => [
      ...prev,
      { id: buildId(), gasType: "", pricePerKg: "" },
    ]);
  };

  const removeGasOffer = (id: string) => {
    setGasOffers((prev) =>
      prev.length > 1 ? prev.filter((offer) => offer.id !== id) : prev,
    );
  };

  const removeImageField = (id: string) => {
    setVendorImages((prev) => prev.filter((image) => image.id !== id));
  };

  const appendPickedImage = (asset: ImagePicker.ImagePickerAsset) => {
    if (!asset.uri) return;

    setVendorImages((prev) => [
      ...prev,
      {
        id: buildId(),
        uri: asset.uri,
        fileName: asset.fileName ?? `vendor-image-${Date.now()}.jpg`,
        mimeType: asset.mimeType ?? "image/jpeg",
      },
    ]);
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow photo library access to upload vendor images.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.85,
    });

    if (result.canceled) return;
    appendPickedImage(result.assets[0]);
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow camera access to capture vendor images.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.85,
    });

    if (result.canceled) return;
    appendPickedImage(result.assets[0]);
  };

  const isBasicDetailsValid =
    vendorName.trim().length >= 3 && vendorDescription.trim().length >= 10;

  const areCoordinatesValid =
    Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude));

  const hasValidGasOffers = gasOffers.every(
    (offer) =>
      offer.gasType.trim().length > 0 &&
      Number.isFinite(Number(offer.pricePerKg)) &&
      Number(offer.pricePerKg) > 0,
  );

  const hasAtLeastOneImage = vendorImages.length > 0;

  const isProfileDetailsValid =
    city.trim().length > 0 &&
    street.trim().length > 0 &&
    areCoordinatesValid &&
    hasValidGasOffers &&
    hasAtLeastOneImage;

  const payload = useMemo(
    () => ({
      vendor: {
        vendorName: vendorName.trim(),
        vendorDescription: vendorDescription.trim(),
        vendorAvailable,
        vendorAddress: {
          city: city.trim(),
          street: street.trim(),
          latitude: Number(latitude),
          longitude: Number(longitude),
          default: isDefaultAddress,
        },
        gasOffer: gasOffers
          .filter((offer) => offer.gasType.trim().length > 0)
          .map((offer) => ({
            gasType: offer.gasType.trim().toUpperCase(),
            pricePerKg: Number(offer.pricePerKg),
          })),
      },
      // Keep the field name aligned with backend contract for multipart uploads.
      vendorImages: vendorImages
        .filter((image) => image.uri.trim().length > 0)
        .map((image) => ({
          uri: image.uri,
          name: image.fileName,
          type: image.mimeType,
        })),
    }),
    [
      city,
      gasOffers,
      isDefaultAddress,
      latitude,
      longitude,
      street,
      vendorAvailable,
      vendorDescription,
      vendorImages,
      vendorName,
    ],
  );

  const handleNext = () => {
    if (!isBasicDetailsValid) return;
    setStep(2);
  };

  const handleRegisterVendor = () => {
    if (!isBasicDetailsValid || !isProfileDetailsValid) return;

    console.log("vendor-profile-payload", JSON.stringify(payload, null, 2));
    setVendorProfileComplete(true);
    router.replace("/(tabs)/orders");
  };

  const progressWidth = step === 1 ? "50%" : "100%";

  const sectionTitle =
    step === 1 ? "Vendor account setup" : "Offers and media setup";
  const sectionSubtitle =
    step === 1
      ? "Input your correct business data to register your gas vendor with us"
      : "Add your address, gas pricing, and image URLs to finish setup";

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerWrap}>
            <View style={styles.brandRow}>
              <View style={styles.brandLeft}>
                <Ionicons name="flame" size={20} color="#F97316" />
                <Text style={styles.brand}>Refil</Text>
              </View>
              <Text style={styles.stepText}>{step} of 2</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: progressWidth }]} />
            </View>

            <Text style={styles.title}>{sectionTitle}</Text>
            <Text style={styles.subtitle}>{sectionSubtitle}</Text>
          </View>

          {step === 1 ? (
            <View style={styles.formWrap}>
              <Text style={styles.label}>Vendor name</Text>
              <View style={styles.inputWithIconWrap}>
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder=""
                  placeholderTextColor="#9CA3AF"
                  value={vendorName}
                  onChangeText={setVendorName}
                />
                <Feather name="briefcase" size={22} color="#64748B" />
              </View>

              <Text style={styles.label}>Vendor description</Text>
              <TextInput
                style={styles.textArea}
                multiline
                placeholder=""
                placeholderTextColor="#9CA3AF"
                value={vendorDescription}
                onChangeText={setVendorDescription}
              />

              <Text style={styles.label}>Vendor available</Text>
              <View style={styles.toggleRow}>
                <Pressable
                  style={[
                    styles.toggleChip,
                    vendorAvailable && styles.toggleChipActive,
                  ]}
                  onPress={() => setVendorAvailable(true)}
                >
                  <Text
                    style={[
                      styles.toggleChipText,
                      vendorAvailable && styles.toggleChipTextActive,
                    ]}
                  >
                    Available
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.toggleChip,
                    !vendorAvailable && styles.toggleChipActive,
                  ]}
                  onPress={() => setVendorAvailable(false)}
                >
                  <Text
                    style={[
                      styles.toggleChipText,
                      !vendorAvailable && styles.toggleChipTextActive,
                    ]}
                  >
                    Not available
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.formWrap}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                value={city}
                onChangeText={setCity}
              />

              <Text style={styles.label}>Street</Text>
              <View style={styles.inputWithIconWrap}>
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="Where is your vendor located?"
                  placeholderTextColor="#4B5563"
                  value={street}
                  onChangeText={setStreet}
                />
                <MaterialIcons name="location-city" size={22} color="#0F1E5A" />
              </View>

              <View style={styles.row}>
                <View style={styles.halfField}>
                  <Text style={styles.label}>Latitude</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    placeholder=""
                    placeholderTextColor="#9CA3AF"
                    value={latitude}
                    onChangeText={setLatitude}
                  />
                </View>
                <View style={styles.halfField}>
                  <Text style={styles.label}>Longitude</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    placeholder=""
                    placeholderTextColor="#9CA3AF"
                    value={longitude}
                    onChangeText={setLongitude}
                  />
                </View>
              </View>

              <Pressable
                style={styles.checkboxRow}
                onPress={() => setIsDefaultAddress((prev) => !prev)}
              >
                <View
                  style={[
                    styles.checkbox,
                    isDefaultAddress && styles.checkboxChecked,
                  ]}
                >
                  {isDefaultAddress ? (
                    <Feather name="check" size={14} color="#FFFFFF" />
                  ) : null}
                </View>
                <Text style={styles.checkboxLabel}>Set as default address</Text>
              </Pressable>

              <Text style={styles.label}>Gas offers</Text>
              {gasOffers.map((offer) => (
                <View key={offer.id} style={styles.offerCard}>
                  <View style={styles.row}>
                    <View style={styles.halfField}>
                      <Text style={styles.labelSmall}>Gas type</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g. LPG"
                        placeholderTextColor="#9CA3AF"
                        value={offer.gasType}
                        onChangeText={(value) =>
                          handleOfferChange(offer.id, "gasType", value)
                        }
                      />
                    </View>
                    <View style={styles.halfField}>
                      <Text style={styles.labelSmall}>Price per kg</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="decimal-pad"
                        placeholder="e.g. 850"
                        placeholderTextColor="#9CA3AF"
                        value={offer.pricePerKg}
                        onChangeText={(value) =>
                          handleOfferChange(offer.id, "pricePerKg", value)
                        }
                      />
                    </View>
                  </View>
                  <Pressable
                    onPress={() => removeGasOffer(offer.id)}
                    style={styles.removeLinkWrap}
                  >
                    <Text style={styles.removeLink}>Remove offer</Text>
                  </Pressable>
                </View>
              ))}

              <Pressable onPress={addGasOffer} style={styles.addLineWrap}>
                <Feather name="plus-circle" size={16} color="#0F1E5A" />
                <Text style={styles.addLineText}>Add gas offer</Text>
              </Pressable>

              <Text style={styles.label}>Vendor images</Text>
              <View style={styles.imageActionRow}>
                <Pressable
                  style={styles.imageActionButton}
                  onPress={pickFromGallery}
                >
                  <Feather name="image" size={16} color="#0F1E5A" />
                  <Text style={styles.imageActionText}>Pick from gallery</Text>
                </Pressable>
                <Pressable
                  style={styles.imageActionButton}
                  onPress={pickFromCamera}
                >
                  <Feather name="camera" size={16} color="#0F1E5A" />
                  <Text style={styles.imageActionText}>Use camera</Text>
                </Pressable>
              </View>

              {vendorImages.length > 0 ? (
                <View style={styles.imageGrid}>
                  {vendorImages.map((image) => (
                    <View key={image.id} style={styles.imageCard}>
                      <ExpoImage
                        source={{ uri: image.uri }}
                        style={styles.imagePreview}
                        contentFit="cover"
                      />
                      <View style={styles.imageMetaRow}>
                        <Text numberOfLines={1} style={styles.imageMetaText}>
                          {image.fileName}
                        </Text>
                        <Pressable
                          onPress={() => removeImageField(image.id)}
                          style={styles.removeIconButton}
                        >
                          <Feather name="x" size={18} color="#0F1E5A" />
                        </Pressable>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.helperText}>
                  Add at least one vendor image.
                </Text>
              )}
            </View>
          )}

          <View style={styles.footerWrap}>
            {step === 2 ? (
              <Button
                title="Back"
                variant="outline"
                onPress={() => setStep(1)}
                fullWidth
              />
            ) : null}

            <Button
              title={step === 1 ? "Next" : "Register Vendor"}
              variant="filled"
              onPress={step === 1 ? handleNext : handleRegisterVendor}
              disabled={
                step === 1 ? !isBasicDetailsValid : !isProfileDetailsValid
              }
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 28,
  },
  headerWrap: {
    marginTop: 16,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  brand: {
    fontSize: 44,
    color: "#F97316",
    fontWeight: "700",
    lineHeight: 48,
  },
  stepText: {
    fontSize: 38,
    fontWeight: "700",
    color: "#111827",
  },
  progressTrack: {
    marginTop: 16,
    height: 4,
    backgroundColor: "#CBD5E1",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: 4,
    backgroundColor: "#0F1E5A",
  },
  title: {
    marginTop: 58,
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  formWrap: {
    marginTop: 58,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  labelSmall: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 4,
  },
  input: {
    height: 62,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },
  inputWithIconWrap: {
    height: 62,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    paddingLeft: 16,
    paddingRight: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  textArea: {
    minHeight: 110,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 16,
    color: "#111827",
    textAlignVertical: "top",
  },
  toggleRow: {
    flexDirection: "row",
    gap: 10,
  },
  toggleChip: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  toggleChipActive: {
    borderColor: "#0F1E5A",
    backgroundColor: "#E0E7FF",
  },
  toggleChipText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
  },
  toggleChipTextActive: {
    color: "#0F1E5A",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#0F1E5A",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#0F1E5A",
  },
  checkboxLabel: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "500",
  },
  offerCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    padding: 10,
    gap: 10,
    backgroundColor: "#F8FAFC",
  },
  removeLinkWrap: {
    alignSelf: "flex-end",
    paddingHorizontal: 4,
  },
  removeLink: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "600",
  },
  addLineWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 2,
  },
  addLineText: {
    color: "#0F1E5A",
    fontSize: 14,
    fontWeight: "700",
  },
  imageActionRow: {
    flexDirection: "row",
    gap: 10,
  },
  imageActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    paddingVertical: 12,
  },
  imageActionText: {
    color: "#0F1E5A",
    fontSize: 14,
    fontWeight: "700",
  },
  helperText: {
    color: "#64748B",
    fontSize: 13,
  },
  imageGrid: {
    gap: 10,
  },
  imageCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: 170,
    backgroundColor: "#E2E8F0",
  },
  imageMetaRow: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  imageMetaText: {
    flex: 1,
    color: "#334155",
    fontSize: 13,
    fontWeight: "500",
  },
  removeIconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  footerWrap: {
    marginTop: 34,
    gap: 12,
    paddingBottom: 12,
  },
});
