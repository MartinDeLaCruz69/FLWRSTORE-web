<template>
  <div class="pt-24 pb-12 px-4 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center text-pink-500 mb-8">Formas de Pago 💳</h1>
    
    <div class="grid gap-6 md:grid-cols-2">
      <div class="bg-white p-6 rounded-xl shadow-md border border-pink-100 hover:shadow-lg transition">
        <div class="flex items-center mb-4">
          <div class="bg-pink-100 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800">Transferencia / Depósito</h2>
        </div>
        <p class="text-gray-600 text-sm mb-4">Aceptamos transferencias interbancarias y depósitos en OXXO/7-Eleven.</p>
        <ul class="text-gray-700 space-y-2 text-sm border-t pt-4">
          <li><strong>Banco:</strong> Tu Banco Aquí</li>
          <li><strong>CLABE:</strong> 0000 0000 0000 0000 00</li>
          <li><strong>Titular:</strong> Nombre de tu novia</li>
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md border border-pink-100 hover:shadow-lg transition">
        <div class="flex items-center mb-4">
          <div class="bg-blue-50 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800">Plataformas Digitales</h2>
        </div>
        <p class="text-gray-600 text-sm mb-4">Pagos rápidos y seguros mediante links de pago.</p>
        <div class="space-y-3">
          <div class="flex items-center justify-between bg-gray-50 p-2 rounded border border-dashed border-gray-300">
            <span class="text-xs font-bold text-blue-600 uppercase">Mercado Pago</span>
            <span class="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">Activo</span>
          </div>
          <div class="flex items-center justify-between bg-gray-50 p-2 rounded border border-dashed border-gray-300">
            <span class="text-xs font-bold text-indigo-600 uppercase">PayPal</span>
            <span class="text-[10px] bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Próximamente</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 bg-pink-50 border-l-4 border-pink-400 p-4 rounded">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-pink-700">
            Recuerda enviar tu comprobante de pago por <strong>WhatsApp</strong> para validar tu apartado en un máximo de 24 horas.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>