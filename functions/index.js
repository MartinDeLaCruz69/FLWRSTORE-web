const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { Resend } = require("resend");

initializeApp();

const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

exports.notificarNuevoStock = onDocumentCreated(
  {
    document: "productos/{productoId}",
    secrets: [RESEND_API_KEY],
  },
  async (event) => {
    const producto = event.data?.data();
    if (!producto) return;

    if (producto.estado === "vendido" || producto.estado === "apartado") return;

    const db = getFirestore();
    const resend = new Resend(RESEND_API_KEY.value());

    const snap = await db
      .collection("usuarios")
      .where("notificaciones", "==", true)
      .get();

    if (snap.empty) return;

    const emails = snap.docs.map((d) => d.data().email).filter(Boolean);
    if (emails.length === 0) return;

    const precio = Number(producto.precio || 0).toLocaleString("es-MX");
    const nombre = producto.nombre || "Nuevo producto";
    const grupo = producto.grupo || "";
    const categoria = producto.categoria || "";
    const imagenUrl = producto.imagenUrl || null;

    await Promise.all(
      emails.map((email) =>
        resend.emails.send({
          from: "FLWRSTORE <noreply@flwrstore.com.mx>",
          to: email,
          subject: `🌸 Nuevo stock: ${nombre}`,
          html: `
        <div style="font-family:'DM Sans',sans-serif;max-width:520px;margin:0 auto;background:#fff8f5;border-radius:20px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#f48fb1,#e91e8c);padding:32px;text-align:center;">
            <h1 style="color:#fff;font-size:1.6rem;margin:0;">🌸 FLWR STORE</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:0.95rem;">¡Nuevo producto disponible!</p>
          </div>

          ${imagenUrl ? `<img src="${imagenUrl}" alt="${nombre}" style="width:100%;max-height:280px;object-fit:cover;" />` : ""}

          <div style="padding:28px 32px;">
            <p style="color:#888;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">${categoria} · ${grupo}</p>
            <h2 style="font-family:'Playfair Display',serif;font-size:1.5rem;color:#1a1a1a;margin:0 0 12px;">${nombre}</h2>
            <p style="font-size:1.3rem;color:#e91e8c;font-weight:700;margin:0 0 24px;">$${precio} MXN</p>

            <a href="https://flwrstore.com.mx/stock"
              style="display:inline-block;background:linear-gradient(135deg,#f48fb1,#e91e8c);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:600;font-size:0.95rem;">
              Ver en la tienda →
            </a>
          </div>

          <div style="padding:20px 32px;border-top:1px solid rgba(233,30,140,0.1);text-align:center;">
            <p style="color:#aaa;font-size:0.75rem;margin:0;">
              Recibiste este email porque activaste las notificaciones en FLWRSTORE.<br/>
              <a href="https://flwrstore.com.mx" style="color:#e91e8c;">Visitar tienda</a>
            </p>
          </div>
        </div>
      `,
        }),
      ),
    );

    console.log(
      `✅ Notificaciones enviadas a ${emails.length} usuarios para: ${nombre}`,
    );
  },
);
