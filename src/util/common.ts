export const shapeScaleAndXY = (
  shape: any,
  wrapWidth: number,
  wrapHeight: number,
) => {
  shape.attrs.enclosingWidth = shape.attrs.enclosingWidth
    ? shape.attrs.enclosingWidth
    : 1;
  shape.attrs.enclosingHeight = shape.attrs.enclosingHeight
    ? shape.attrs.enclosingHeight
    : 1;
  const scaleX = wrapWidth / shape.attrs.enclosingWidth;
  const scaleY = wrapHeight / shape.attrs.enclosingHeight;
  let validScale = 0;
  // 长宽要等比例缩放 以缩放小的为准，因为如果大了工具箱显示不下，在画板中显示的图元把scale，scaleX，scaleY去掉了，x，y也重新赋值
  validScale = scaleX < scaleY ? scaleX : scaleY;
  const scale = {
    x: validScale,
    y: validScale,
  };
  shape.attrs.scale = scale;
  // 放到shapebox中的坐标
  shape.attrs.x = shape.attrs.y = 0;
};
