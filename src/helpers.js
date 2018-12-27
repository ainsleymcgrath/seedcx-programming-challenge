// wrapper for opening up the message stream from the Coinbase websocket
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

// makes money look like money
export function toTwoDecimals(n) {
  return parseFloat(n).toFixed(2);
}

// six digits mostly cuz it looks nice
export function toSixPrecision(n) {
  return parseFloat(n).toPrecision(6);
}
