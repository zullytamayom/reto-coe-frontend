# Banco TEST - Panel de Control de Autorizaciones Bancarias

Canal visual corporativo e intuitivo diseñado para que los auditores del banco puedan vigilar, evaluar, crear y decidir sobre las solicitudes técnicas internas en tiempo real.

## Stack Tecnológico
* **Angular 18/19** (Componentes Autónomos - *Standalone Components*)
* **RxJS** (Manejo de flujos de datos asíncronos en el cliente)
* **Sintaxis NAtiva de Flujo de Control** (`@for`, `@empty` para alto rendimiento de renderizado)
* **EventSource API** (Consumo nativo del protocolo Server-Sent Events)

## Características UX/UI Implementadas
* **Paginación Local en Frontend:** Optimización de renderizado en la tabla que segmenta los datos en bloques fijos de 5 filas para proteger la memoria RAM del navegador.
* **Manejo de Estados Inmutables:** Los botones de acción de auditoría (*Aprobar/Rechazar*) se bloquean de forma definitiva en cuanto una solicitud es resuelta, mitigando el riesgo de doble procesamiento.
* **Componente de Alertas Toast Reactivas:** Escucha en segundo plano el stream de WebFlux. Al detectar un evento de AWS SQS, salta una tarjeta animada en la esquina superior de la pantalla de forma inmediata sin necesidad de recargar la página.
