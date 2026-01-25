export default function DndBox({ content, onDragStart, isDraggable = true }) {
  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => isDraggable && onDragStart && onDragStart(e, content)}
      style={{
        padding: "5px 10px",
        borderRadius: "15px",
        width: "fit-content",
        background: "#A9DC97",
        cursor: isDraggable ? "grab" : "default",
        userSelect: "none",
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {content}
    </div>
  );
}