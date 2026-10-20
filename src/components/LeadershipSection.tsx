const leaders = [
	{
		name: "Dibyo Majumder",
		title: "Co-founder & CEO",
		image: "/assets/dibyo.jpeg",
		linkedin: "https://www.linkedin.com/in/dibyo-majumder/",
		x: "https://x.com/MajumderDibyo",
	},
	{
		name: "Prince Raj",
		title: "Co-founder & CTO",
		image: "/assets/prince_raj.jpeg",
		linkedin: "https://www.linkedin.com/in/rajweb3/",
		x: "https://x.com/rajweb3_",
	},
];

function LinkedInIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

function XIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

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
								className="leadership-card"
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
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<h3
											style={{
												font: "var(--heading-2)",
												color: "var(--blue-950)",
												margin: 0,
											}}
										>
											{person.name}
										</h3>
										<div
											style={{
												display: "flex",
												gap: 8,
											}}
										>
										<a
											href={person.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`${person.name} on LinkedIn`}
											className="leadership-social-link"
										>
											<LinkedInIcon />
										</a>
										<a
											href={person.x}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`${person.name} on X`}
											className="leadership-social-link"
										>
											<XIcon />
										</a>
									</div>
								</div>
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
        .leadership-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color 200ms ease, background 200ms ease;
        }
        .leadership-social-link:hover {
          color: var(--blue-700);
          background: var(--blue-050);
        }
      `}</style>
		</>
	);
}
