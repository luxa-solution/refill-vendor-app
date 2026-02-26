export type OnboardingSlide = {
  id: number;
  title: string;
  description: string;
  imgsrc: any;
  /** 'top' = image above text, 'bottom' = text above image (last slide layout) */
  layout: "imageTop" | "imageBottom";
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Manage Customer Orders Easily",
    description:
      "Receive orders, accept or reject requests, and update order status with ease.",
    imgsrc: require("@assets/images/gas-container.png"),
    layout: "imageTop",
  },
  {
    id: 2,
    title: "Everything You Need for Your Gas Business",
    description:
      "Manage orders, deliveries, and customers from one powerful platform built for gas vendors.",
    imgsrc: require("@assets/images/gas-container.png"),
    layout: "imageTop",
  },
  {
    id: 3,
    title: "Track Sales, Know Your Earnings",
    description:
      "View daily orders, transaction history, and basic earnings at a glance.",
    imgsrc: require("@assets/images/gas-container.png"),
    layout: "imageBottom",
  },
];
