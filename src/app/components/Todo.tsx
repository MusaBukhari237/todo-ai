'use client';

import React from 'react';
import HeroSection from './HeroSection'
import NavBar from './NavBar'
import TodoList from './TodoList'
import { itemTemplate } from '../misc/globalVariables';
import TodoCRUD from './TodoCRUD/TodoCRUD_Dailog';
import DB from '../misc/DB';
import { Item } from '../misc/globalInterfaces';
import Notification from '../misc/Notification';

export default function Todo() {

    const [searchValue, setSearchValue] = React.useState("");
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [todoCrud, setTodoCrud]: any = React.useState({ isOpen: false, isAdd: true, item: itemTemplate });
    const [items, setItems]: any = React.useState([]);

    const formRefresh = async () => {
        setIsProcessing(true);
        try {
            let tempItems: any = await fetch("/api/todo", {
                cache: 'no-store',
                method: 'GET'
            });

            tempItems = await tempItems.json();
            tempItems.data.map((item: any, index: number) => {
                const tempLabels: string[] = [];

                item.labels.map((item2: any, index2: number) => {
                    tempLabels.push(item2.title);
                });

                tempItems.data[index].labels = tempLabels;
            });

            if (tempItems.success) {
                console.log(tempItems.data);
                setItems(tempItems.data);
            }
        } catch (e: any) {

        }

        Notification("success", "List Refreshed");
        setIsProcessing(false);
    }

    const formCreate = async () => {
        let isException: { isError: boolean, message: any } = { isError: false, message: "" };

        setIsProcessing(true);
        try {
            let tempItem: any = await fetch("/api/todo", {
                cache: 'no-store',
                method: 'POST',
                body: JSON.stringify({
                    title: todoCrud.item.title,
                    description: todoCrud.item.description,
                    priority: todoCrud.item.priority,
                    status: todoCrud.item.status
                })
            });

            tempItem = await tempItem.json();

            for (let index = 0; index < todoCrud.item.labels.length; index++) {
                const label = todoCrud.item.labels[index];

                let tempLabel: any = await fetch(`/api/label/${(tempItem.data.id).toString()}`, {
                    cache: 'no-store',
                    method: 'POST',
                    body: JSON.stringify({
                        title: label,
                    })
                });

                tempLabel = await tempLabel.json();

                console.log(tempLabel);
                if (!tempLabel.success) {
                    isException = { isError: true, message: "Error Occurred!" };
                }

            }

            if (tempItem.success) {
                formRefresh();
                setTodoCrud({ ...todoCrud, isOpen: false });
            } else {
                isException = { isError: true, message: "Error Occurred!" };
            }
        } catch (e: any) {
            console.log(e);
            isException = { isError: true, message: "Error Occurred!" };
        }

        if (isException.isError) {
            alert(isException.message);
        }

        setIsProcessing(false);
    }

    const formUpdate = async () => {
        let isException: { isError: boolean, message: any } = { isError: false, message: "" };

        setIsProcessing(true);
        try {
            let tempItem: any = await fetch(`/api/todo/${todoCrud.item.id}`, {
                cache: 'no-store',
                method: 'PUT',
                body: JSON.stringify({
                    title: todoCrud.item.title,
                    description: todoCrud.item.description,
                    priority: todoCrud.item.priority,
                    status: todoCrud.item.status
                })
            });

            tempItem = await tempItem.json();


            let tempLabel: any = await fetch(`/api/label/${(tempItem.data.id).toString()}`, {
                cache: 'no-store',
                method: 'PATCH'
            });

            tempLabel = await tempLabel.json();

            if (!tempLabel.success) {
                isException = { isError: true, message: "Error Occurred!" };
            }

            for (let index = 0; index < todoCrud.item.labels.length; index++) {
                const label = todoCrud.item.labels[index];

                let tempLabel: any = await fetch(`/api/label/${(tempItem.data.id).toString()}`, {
                    cache: 'no-store',
                    method: 'POST',
                    body: JSON.stringify({
                        title: label,
                    })
                });

                tempLabel = await tempLabel.json();

                console.log(tempLabel);
                if (!tempLabel.success) {
                    isException = { isError: true, message: "Error Occurred!" };
                }

            }

            if (tempItem.success) {
                formRefresh();
                setTodoCrud({ ...todoCrud, isOpen: false });
            } else {
                isException = { isError: true, message: "Error Occurred!" };
            }
        } catch (e: any) {
            console.log(e);
            isException = { isError: true, message: "Error Occurred!" };
        }

        if (isException.isError) {
            alert(isException.message);
        }

        setIsProcessing(false);
    }

    const formDelete = async () => {
        if (confirm("Are you sure, you want to delete this record?")) {

            let isException: { isError: boolean, message: any } = { isError: false, message: "" };

            setIsProcessing(true);
            try {
                let tempItem: any = await fetch(`/api/todo/${todoCrud.item.id}`, {
                    cache: 'no-store',
                    method: 'DELETE'
                });

                tempItem = await tempItem.json();

                let tempLabel: any = await fetch(`/api/label/${(todoCrud.item.id).toString()}`, {
                    cache: 'no-store',
                    method: 'PATCH'
                });

                tempLabel = await tempLabel.json();

                if (!tempLabel.success) {
                    isException = { isError: true, message: "Error Occurred!" };
                }

                if (tempItem.success) {
                    formRefresh();
                    setTodoCrud({ ...todoCrud, isOpen: false });
                } else {
                    isException = { isError: true, message: "Error Occurred!" };
                }
            } catch (e: any) {
                console.log(e);
                isException = { isError: true, message: "Error Occurred!" };
            }

            if (isException.isError) {
                alert(isException.message);
            }

            setIsProcessing(false);
        }
    }

    React.useEffect(() => {
        formRefresh();
    }, []);

    return (
        <div>
            {isProcessing ?
                <div className="absolute w-full h-full flex justify-center items-center bg-base-200 z-5" style={{
                    height: "-webkit-fill-available"
                }}>
                    <span className="loading loading-dots w-[40px]"></span>
                </div>
                : null}

            <TodoCRUD
                isOpen={todoCrud.isOpen}
                isProcessing={isProcessing}
                onDismiss={() => setTodoCrud({ ...todoCrud, isOpen: false })}
                itemData={todoCrud.item}
                onChange={(value: any) => setTodoCrud({ ...todoCrud, item: value })}
                onSubmit={() => todoCrud.isAdd ? formCreate() : formUpdate()}
                onDelete={() => formDelete()}
                onSuggest={() => alert("Suggest!")}
            />

            <HeroSection
                searchValue={setSearchValue}
                onAdd={() => setTodoCrud({ ...todoCrud, isOpen: true, isAdd: true, item: itemTemplate })}
                onRefresh={formRefresh}
            />

            <TodoList
                itemsData={items}
                searchValue={searchValue}
                onSelect={(item: any) => setTodoCrud({ ...todoCrud, isOpen: true, isAdd: false, item: item })}
            />
        </div>
    )
}
