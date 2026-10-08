const heights = {
  sm: "h-14 sm:h-16 xl:h-[4.5rem]",
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
      className={`${heights[size]} w-auto shrink-0 object-contain`}
    />
  );
}
