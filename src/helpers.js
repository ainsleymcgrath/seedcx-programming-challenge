export function openSubcriptionToCoinbaseWebSocket(url, callback) {
  const socket = new WebSocket(url);

  socket.onopen = () =>
    socket.send(
      JSON.stringify({
        type: "subscribe",
        product_ids: ["BTC-USD"],
        channels: [
          "level2",
          "heartbeat",
          {
            name: "ticker",
            product_ids: ["BTC-USD"]
          }
        ]
      })
    );

  socket.onmessage = msg => callback(msg);
}
