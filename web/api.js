// API JavaScript - Conexión con servicios backend

class RadioAPI {
    constructor(baseUrl = 'http://192.168.4.1') {
        this.baseUrl = baseUrl;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    // Obtener estado general del sistema
    async getStatus() {
        try {
            const response = await fetch(`${this.baseUrl}/api/status`);
            return await response.json();
        } catch (error) {
            console.error('Error en getStatus:', error);
            return null;
        }
    }

    // Obtener posiciones APRS
    async getAPRSPositions() {
        try {
            const response = await fetch(`${this.baseUrl}/api/aprs/positions`);
            return await response.json();
        } catch (error) {
            console.error('Error en getAPRSPositions:', error);
            return [];
        }
    }

    // Enviar mensaje por APRS
    async sendAPRSMessage(to, message) {
        try {
            const response = await fetch(`${this.baseUrl}/api/aprs/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to, message })
            });
            return await response.json();
        } catch (error) {
            console.error('Error en sendAPRSMessage:', error);
            return { success: false, error };
        }
    }

    // Obtener mensajes Winlink
    async getWinlinkMessages() {
        try {
            const response = await fetch(`${this.baseUrl}/api/winlink/messages`);
            return await response.json();
        } catch (error) {
            console.error('Error en getWinlinkMessages:', error);
            return [];
        }
    }

    // Enviar email por Winlink
    async sendWinlinkEmail(to, subject, body) {
        try {
            const response = await fetch(`${this.baseUrl}/api/winlink/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to, subject, body })
            });
            return await response.json();
        } catch (error) {
            console.error('Error en sendWinlinkEmail:', error);
            return { success: false, error };
        }
    }

    // Obtener mensajes JS8Call
    async getJS8Messages() {
        try {
            const response = await fetch(`${this.baseUrl}/api/js8/messages`);
            return await response.json();
        } catch (error) {
            console.error('Error en getJS8Messages:', error);
            return [];
        }
    }

    // Enviar mensaje JS8Call
    async sendJS8Message(to, message) {
        try {
            const response = await fetch(`${this.baseUrl}/api/js8/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to, message })
            });
            return await response.json();
        } catch (error) {
            console.error('Error en sendJS8Message:', error);
            return { success: false, error };
        }
    }

    // Obtener estado de dispositivos Meshtastic
    async getMeshtasticDevices() {
        try {
            const response = await fetch(`${this.baseUrl}/api/meshtastic/devices`);
            return await response.json();
        } catch (error) {
            console.error('Error en getMeshtasticDevices:', error);
            return [];
        }
    }

    // Enviar mensaje mesh
    async sendMeshMessage(to, message) {
        try {
            const response = await fetch(`${this.baseUrl}/api/meshtastic/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to, message })
            });
            return await response.json();
        } catch (error) {
            console.error('Error en sendMeshMessage:', error);
            return { success: false, error };
        }
    }

    // Obtener historial centralizado
    async getMessageHistory(filter = {}) {
        try {
            const params = new URLSearchParams(filter);
            const response = await fetch(`${this.baseUrl}/api/messages/history?${params}`);
            return await response.json();
        } catch (error) {
            console.error('Error en getMessageHistory:', error);
            return [];
        }
    }

    // Obtener documentos disponibles
    async getDocuments() {
        try {
            const response = await fetch(`${this.baseUrl}/api/documents/list`);
            return await response.json();
        } catch (error) {
            console.error('Error en getDocuments:', error);
            return [];
        }
    }

    // WebSocket para tiempo real
    connectWebSocket() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.ws = new WebSocket(`${protocol}//${window.location.host}/api/ws`);
        
        this.ws.onopen = () => {
            console.log('WebSocket conectado');
            this.reconnectAttempts = 0;
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Mensaje WebSocket:', data);
            
            // Disparar evento personalizado
            document.dispatchEvent(new CustomEvent('radioUpdate', { detail: data }));
        };

        this.ws.onerror = (error) => {
            console.error('Error WebSocket:', error);
        };

        this.ws.onclose = () => {
            console.log('WebSocket desconectado');
            this.attemptReconnect();
        };
    }

    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
            console.log(`Intentando reconectar en ${delay}ms...`);
            setTimeout(() => this.connectWebSocket(), delay);
        }
    }
}

// Instancia global
const radioAPI = new RadioAPI();

// Escuchar eventos en tiempo real
document.addEventListener('radioUpdate', (event) => {
    console.log('Actualización recibida:', event.detail);
    
    // Aquí actualizar la UI según el tipo de evento
    const { type, data } = event.detail;
    
    switch(type) {
        case 'aprs_position':
            console.log('Nueva posición APRS:', data);
            break;
        case 'message':
            console.log('Nuevo mensaje:', data);
            break;
        case 'device_status':
            console.log('Estado dispositivo:', data);
            break;
    }
});
