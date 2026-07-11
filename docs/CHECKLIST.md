# 📋 CHECKLIST DE PUESTA EN MARCHA

Marca los pasos conforme los completes:

## Preparación Inicial
- [ ] Clonar repositorio
- [ ] Conectar tarjeta de sonido USB
- [ ] Conectar cables serie a radios
- [ ] Verificar permisos de puertos USB

## Instalación
- [ ] Ejecutar `sudo ./scripts/install.sh`
- [ ] Esperar a que finalice (20-30 min)
- [ ] Reiniciar Pi: `sudo reboot`
- [ ] Verificar que WiFi `RADIO-OFFLINE` aparece

## Configuración Inicial
- [ ] Editar `.env` con tus datos
- [ ] Editar `config/direwolf.conf` con indicativo
- [ ] Editar `config/pat-config.json` con email
- [ ] Conectar radios a puertos USB

## Verificación de Servicios
- [ ] Ejecutar `./scripts/start.sh`
- [ ] Verificar `./scripts/health-check.sh`
- [ ] Conectar a WiFi desde móvil
- [ ] Acceder a `http://192.168.4.1`
- [ ] Probar botones de la interfaz

## Pruebas de Radio
- [ ] [ ] Hacer beacon APRS
- [ ] [ ] Recibir posiciones APRS
- [ ] [ ] Enviar mensaje Winlink
- [ ] [ ] Recibir email por radio
- [ ] [ ] Conectar a red mesh 868 MHz

## Documentación
- [ ] Guardar frecuencias en manuales
- [ ] Documentar configuración especial
- [ ] Crear procedimientos de operación
- [ ] Backup inicial en segundo pen

## Producción
- [ ] WiFi contraseña cambiada
- [ ] Backups automáticos programados
- [ ] Monitoreo 24/7 activado
- [ ] Plan de contingencia documentado

---

**¡Sistema listo para operaciones de emergencia!** 🚨📡
