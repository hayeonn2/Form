"use client";

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ITEM_TYPE = 'ITEM';

function DraggableItem({ id, text, index }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { id, index }, // 드래그할 항목의 ID와 인덱스를 보냄
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, padding: '8px', border: '1px solid gray', cursor: 'move' }}>
            {text}
        </div>
    );
}

function DroppableArea({ items, setItems }) {
    const [, drop] = useDrop(() => ({
        accept: ITEM_TYPE,
        drop: (item, monitor) => {
            const dragIndex = item.index; // 드래그된 항목의 인덱스
            const hoverIndex = Math.floor(monitor.getClientOffset().y / 50); // 드롭할 위치의 인덱스 계산 (50은 항목의 높이)

            // 유효한 hoverIndex 계산
            const newHoverIndex = Math.min(hoverIndex, items.length - 1); // 배열의 길이를 초과하지 않도록 제한

            // 항목 순서 변경 - 동일한 인덱스에서 드롭하는 경우에도 처리
            const updatedItems = [...items];
            // 드래그된 항목 제거
            const [movedItem] = updatedItems.splice(dragIndex, 1);
            // 드롭된 위치에 항목 추가
            updatedItems.splice(newHoverIndex, 0, movedItem);
            setItems(updatedItems); // 상태 업데이트
        },
    }));

    return (
        <div ref={drop} style={{ minHeight: '200px', padding: '16px', border: '1px dashed black' }}>
            {items.map((item, index) => (
                <DraggableItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    index={index}
                />
            ))}
        </div>
    );
}

export default function DndPage() {
    const [items, setItems] = useState([
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
        { id: 4, text: 'Item 4' }, // 추가 항목 예시
    ]);

    return (
        <DndProvider backend={HTML5Backend}>
            <DroppableArea items={items} setItems={setItems} />
        </DndProvider>
    );
}
