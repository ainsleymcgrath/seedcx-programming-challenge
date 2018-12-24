export function openSubcriptionToCoinbaseWebSocket(url, callback) {
  const socket = new WebSocket(url);

  socket.onopen = () =>
    socket.send(
      JSON.stringify({
        type: "subscribe",
        product_ids: ["BTC-USD"],
        channels: ["level2", "matches"]
      })
    );

  socket.onmessage = msg => callback(msg);
}

export function toTwoDecimals(n) {
  return parseFloat(n).toFixed(2);
}

export function toSixSigFigs(n) {
  return parseFloat(n).toPrecision(6);
}
