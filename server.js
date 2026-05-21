const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT || 4118);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const lesson = {
  id: "search-api",
  title: "Search API",
  level: "Then Learn",
  stack: ["Elasticsearch", "Algolia", "Meilisearch"],
  useCases: ["Product search", "Full-text", "Faceted filtering"],
};

app.get("/api/health", (req, res) =>
  res.json({ success: true, lesson: lesson.id }),
);
app.get("/api/lesson", (req, res) => res.json({ success: true, data: lesson }));
app.get("/api/demo", (req, res) => {
  const q = req.query.q || "laptop";
  res.json({
    success: true,
    q,
    total: 2,
    hits: [
      { id: 1, name: "Demo Result A" },
      { id: 2, name: "Demo Result B" },
    ],
  });
});

app.get("/", (req, res) => {
  res.type("html").send(
    `
        <html>
          <head>
            <title>${lesson.title} Lab</title>
            <style>
              body {
                font-family: Manrope, Arial, sans-serif;
                background: #f5f1ea;
                padding: 24px;
              }
              main {
                max-width: 900px;
                margin: auto;
                background: #fff;
                padding: 20px;
                border-radius: 16px;
              }
            </style>
          </head>
          <body>
            <main>
              <h1>${lesson.title} Lab</h1>
              <p>Practice indexing, ranking, and typo-tolerant search flows.</p>
              <p><a href="/api/lesson">GET /api/lesson</a></p>
            </main>
          </body>
        </html>
      `,
  );
});

app.listen(PORT, () =>
  console.log(`${lesson.title} lab running on http://localhost:${PORT}`),
);
