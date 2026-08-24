export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <img
        src="/assets/fg.png"
        alt=""
        style={{
          width: "clamp(360px, 60vw, 840px)",
          height: "auto",
        }}
      />
    </main>
  );
}
