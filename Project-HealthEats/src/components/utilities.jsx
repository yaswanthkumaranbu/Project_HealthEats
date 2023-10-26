import nutritionData from "./nutritionData.json";

export const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];
    console.log(text);
    const includedClasses = nutritionData.map((item) => item.label);

    if (includedClasses.includes(text)) {
      const nutrition = nutritionData.find((item) => item.label === text);

      let color;
      let label;
      let secondLine = `Accuracy: ${nutrition.accuracy}\nName: ${nutrition.name}\nType: ${nutrition.type}\nCalories: ${nutrition.calories}\nProtein: ${nutrition.protein}\nVitamins: ${nutrition.vitamins}\nMinerals: ${nutrition.minerals}\nSuggest: ${nutrition.suggest}`;
      if (["apple", "orange", "banana", "broccoli", "carrot"].includes(text)) {
        color = "green";
        label = text.substring(0, 1).toUpperCase() + text.substring(1);
      } else if (
        ["sandwich", "hot dog", "donut", "cake", "pizza"].includes(text)
      ) {
        color = "red";
        label = text.substring(0, 1).toUpperCase() + text.substring(1);
      } else {
        color = "blue";
        label = text;
      }

      ctx.strokeStyle = color;
      ctx.font = "20px Arial";

      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.stroke();

      ctx.fillStyle = "white";
      const labelWidth = ctx.measureText(label).width;
      const secondLineHeight =
        ctx.measureText(secondLine).actualBoundingBoxAscent;
      const lineHeight = 20;

      ctx.fillRect(x + width + 10, y, labelWidth + 200, 220);

      ctx.fillStyle = color;

      ctx.fillText(label, x + width + 20, y + 20);

      ctx.fillStyle = "black";
      const secondLineParts = secondLine.split("\n");
      secondLineParts.forEach((part, index) => {
        ctx.fillText(part, x + width + 20, y + 50 + index * lineHeight);
      });
    }
  });
};
