"use client";

import React, {useRef, useState} from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ITEM_TYPE = 'ITEM'; // 아이템 타입 선언

function DraggableItem({ id, text, index, moveItem }) {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { id, index }, // 드래그할 항목의 ID와 인덱스를 보냄
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover: (item) => {
            if(item.index !== index) {
                moveItem(item.index, index);
                item.index = index; // 드래그 중인 아이템의 인덱스 업데이트
            }
        }
    });

    drag(drop(ref)); // drag, drop ref 에 연결

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, padding: '8px', border: '1px solid gray', cursor: 'move' }}>
            {text}
        </div>
    );
}

function DroppableArea({ items, setItems }) {
    const moveItem = (fromIdx, toIdx) => {
        const updateData = [...items];
        const [movedItem] = updateData.splice(fromIdx, 1); // 드래그된 항목 제거
        updateData.splice(toIdx, 0, movedItem); // 새로운 위치에 항목 삽입
        setItems(updateData); // 리스트 상태 업데이트
    }

    return (
        <div style={{ minHeight: '200px', padding: '16px', border: '1px dashed black' }}>
            {items.map((item, index) => (
                <DraggableItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    index={index}
                    moveItem={moveItem}
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
