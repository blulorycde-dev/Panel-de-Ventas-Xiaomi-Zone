// workers/api-panel/src/routes/products.ts

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  barcode?: string;
  imageUrl?: string;
  priceRetail: number;
  priceWholesale: number;
  stockByBranch: Record<string, number>; // { "CDE": 10, "TUPI": 3 }
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    sku: "BHR9603GL",
    name: "Xiaomi Scooter Elite Black",
    category: "movilidad",
    barcode: "6971234560001",
    priceRetail: 280,
    priceWholesale: 275,
    imageUrl: "",
    stockByBranch: { CDE: 5, TUPI: 1 }
  },
  {
    id: "p2",
    sku: "BHR9611GL",
    name: "Xiaomi Scooter 5 Pro Black",
    category: "movilidad",
    barcode: "6971234560002",
    priceRetail: 385,
    priceWholesale: 380,
    imageUrl: "",
    stockByBranch: { CDE: 2, TUPI: 0 }
  },
  {
    id: "p3",
    sku: "P27FBB-RGGL",
    name: "Monitor Xiaomi G27i 27\" Gaming",
    category: "electronicos",
    barcode: "6971234560003",
    priceRetail: 135,
    priceWholesale: 130,
    imageUrl: "",
    stockByBranch: { CDE: 8, TUPI: 3 }
  },
  {
    id: "p4",
    sku: "BHR8498EU",
    name: "Xiaomi Air Fryer 3.5L White",
    category: "myhome",
    barcode: "6971234560004",
    priceRetail: 43,
    priceWholesale: 40,
    imageUrl: "",
    stockByBranch: { CDE: 10, TUPI: 4 }
  },
  {
    id: "p5",
    sku: "GLIFO-L9-MINI",
    name: "Blulory Glifo L9 Mini Smartwatch",
    category: "wearables",
    barcode: "6971234560005",
    priceRetail: 19,
    priceWholesale: 17.5,
    imageUrl: "",
    stockByBranch: { CDE: 12, TUPI: 5 }
  }
  // Puedes seguir agregando más mock según tu lista real
];

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

export async function handleProducts(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  const category = (url.searchParams.get("category") ?? "").trim().toLowerCase();
  const branch = (url.searchParams.get("branch") ?? "").trim().toUpperCase();
  const page = Number(url.searchParams.get("page") ?? "1") || 1;
  const pageSize = Number(url.searchParams.get("pageSize") ?? "25") || 25;

  let filtered = [...MOCK_PRODUCTS];

  if (q) {
    filtered = filtered.filter((p) => {
      const hay = (value?: string) =>
        value ? value.toLowerCase().includes(q) : false;
      return (
        hay(p.name) ||
        hay(p.sku) ||
        hay(p.category) ||
        hay(p.barcode)
      );
    });
  }

  if (category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category
    );
  }

  if (branch) {
    filtered = filtered.filter((p) => {
      const stock = p.stockByBranch[branch];
      return typeof stock === "number" && stock > 0;
    });
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  const items = filtered.slice(start, end);

  return json({
    items,
    page: safePage,
    pageSize,
    total,
    totalPages
  });
}
