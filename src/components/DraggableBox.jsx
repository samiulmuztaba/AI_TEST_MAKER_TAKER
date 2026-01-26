import { useDraggable } from "@dnd-kit/core";

export default function DraggableBox({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    fontFamily: "Indie Flower",
    padding: "8px 16px",
    borderRadius: "15px",
    background: "#A9DC97",
    cursor: "grab",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {content}
    </div>
  );
}