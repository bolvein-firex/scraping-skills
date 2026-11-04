const token = process.env.APIFY_TOKEN;
if (!token) {
  console.error('Set APIFY_TOKEN');
  process.exit(1);
}

const input = JSON.parse(process.argv[2] || '{}');
const actorId = process.env.ACTOR_ID;
if (!actorId) {
  console.error('Set ACTOR_ID');
  process.exit(1);
}

const res = await fetch(`https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${token}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(input)
});

if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}

const rows = await res.json();
console.log(JSON.stringify(rows, null, 2));
