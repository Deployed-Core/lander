const leaders = [
	{
		name: "Dibyo Majumder",
		title: "Co-founder",
		image: "/assets/dibyo.jpeg",
	},
	{
		name: "Prince Raj",
		title: "Co-founder",
		image: "/assets/prince_raj.jpeg",
	},
];

export default function LeadershipSection() {
	return (
		<>
			<section
				style={{
					padding: "80px 0 104px",
					background: "#F9F7F3",
				}}
			>
				<div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
					<div style={{ marginBottom: 32 }}>
						<h2
							style={{
								font: "var(--display-3)",
								letterSpacing: "var(--display-track)",
								color: "var(--text-strong)",
								margin: 0,
							}}
						>
							Leadership
						</h2>
						<p
							style={{
								font: "var(--body-lg)",
								color: "var(--text-body)",
								margin: "14px 0 0",
								maxWidth: "62ch",
							}}
						>
							Our leadership brings business and technology together to help
							enterprises turn AI opportunities into practical, lasting
							outcomes.
						</p>
					</div>

					<div
						className="about-leadership-grid"
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(2, minmax(0, 420px))",
							gap: 100,
							justifyItems: "center",
							justifyContent: "space-between",
						}}
					>
						{leaders.map((person) => (
							<article
								key={person.name}
								data-reveal
								style={{
									overflow: "hidden",
									border: "1px solid var(--border-hairline)",
									borderRadius: "var(--radius-md)",
									background: "var(--paper-000)",
									maxWidth: 320,
								}}
							>
								<div
									style={{
										aspectRatio: "auto",
										overflow: "hidden",
										background: "var(--surface-sunken)",
									}}
								>
									<img
										src={person.image}
										alt={person.name}
										style={{
											width: "100%",
											height: "100%",
											objectFit: "contain",
											objectPosition: "center",
											display: "block",
										}}
									/>
								</div>
								<div style={{ padding: "22px 24px 26px" }}>
									<h3
										style={{
											font: "var(--heading-2)",
											color: "var(--blue-950)",
											margin: 0,
										}}
									>
										{person.name}
									</h3>
									<p
										style={{
											font: "var(--body-sm)",
											color: "var(--blue-700)",
											margin: "7px 0 0",
										}}
									>
										{person.title}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<style>{`
        @media (max-width: 600px) {
          .about-leadership-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
		</>
	);
}
