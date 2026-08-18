const heights = {
  sm: "h-12",
  md: "h-16",
  lg: "h-24",
};

const sources = {
  dark: "/logo-cedf-dark.png",
  light: "/logo-cedf-light.png",
};

export default function Wordmark({ tone = "dark", size = "md" }) {
  return (
    <img
      src={sources[tone]}
      alt="Centro Espírita Divaldo Franco"
      className={`${heights[size]} w-auto object-contain`}
    />
  );
}
