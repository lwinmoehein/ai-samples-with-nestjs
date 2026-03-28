import { pipeline } from '@xenova/transformers';

async function helloVector() {
  // 1. Load a tiny embedding model (The "Encoder")
  const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2',
  );

  // 2. Our "Database" (Simple Array of Objects)
  const database = [
    { id: 1, text: 'The cat is sleeping on the mat' },
    { id: 2, text: 'The quick brown fox jumps over the dog' },
    { id: 3, text: 'I love coding in NestJS' },
  ];

  // 3. Vectorize the database (Turning text into lists of numbers)
  const vectorizedDB = await Promise.all(
    database.map(async (item) => ({
      ...item,
      embedding: (
        await extractor(item.text, { pooling: 'mean', normalize: true })
      ).data,
    })),
  );

  // 4. The Query
  const query = 'Tell me about programming';
  const queryEmbedding = (
    await extractor(query, { pooling: 'mean', normalize: true })
  ).data;

  // 5. The "Search" (Cosine Similarity Math)
  // We find which vector has the smallest mathematical distance to our query
  const results = vectorizedDB
    .map((item) => {
      const similarity = dotProduct(queryEmbedding, item.embedding);
      return { text: item.text, score: similarity };
    })
    .sort((a, b) => b.score - a.score);

  console.log(`Query: "${query}"`);
  console.log(
    `Top Match: "${results[0].text}" (Score: ${results[0].score.toFixed(4)})`,
  );
}

// Simple Dot Product function to calculate similarity
function dotProduct(a: any, b: any) {
  return a.reduce((sum: number, val: number, i: number) => sum + val * b[i], 0);
}

helloVector();
