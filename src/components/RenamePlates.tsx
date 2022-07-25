import React, { useEffect, useState } from "react";
import { createRenameMap } from "../utils/createRenameDict";
import { setRenamedPlates, RenamedPlatesType } from "../features/renamedPlatesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { onlyUnique } from "../utils/onlyUnique";

const RenamePlates = () => {
    const dispatch = useAppDispatch();
    const inputPlateNames = useAppSelector((state) => state.plateNames);
    const renamedPlates = useAppSelector((state) => state.renamedPlates);
    const isMultiPlates = useAppSelector((state) => state.isMultiPlates);
    const [localRenamedPlates, setLocalRenamedPlates] = useState<RenamedPlatesType>({})

    useEffect(() => {
        //update redux state when inputPlates changes
        let copy = { ...renamedPlates };
        //add new plate name if new plate is added
        inputPlateNames.forEach((platename) => {
            if (typeof copy[platename] === "undefined") {
                copy[platename] = platename;
                localRenamedPlates[platename] = platename
            }
        });
        let origPlates = Object.keys(renamedPlates);
        //remove plate rename if plate is removed
        origPlates.forEach((orig) => {
            if (!inputPlateNames.includes(orig)) {
                delete copy[orig];
                delete localRenamedPlates[orig]
            }
        });
        dispatch(setRenamedPlates(copy));
    }, [dispatch, inputPlateNames]);


    if (!isMultiPlates) return null;

    const submit = () => {
        dispatch(setRenamedPlates(localRenamedPlates))
    };

    const reset = () => {
        let copy = { ...localRenamedPlates };
        let keys = Object.keys(copy);
        keys.forEach(orig => {
            copy[orig] = orig
        })
        dispatch(setRenamedPlates(copy))

    };

    const changePlateName = (e: any) => {
        let origName = e.currentTarget.dataset.value;
        let isFirst = e.currentTarget.dataset.first === "first";
        if (isFirst && origName.split("\n").length > 1) {
            //assign all names
            //TO-DO
        }
        let newName = e.currentTarget.value;
        let copy = { ...localRenamedPlates }
        copy[origName] = newName
        setLocalRenamedPlates(copy)
    }
    return (
        <div>
            <div className="fsxxl">Rename Plates</div>
            <div>
                <div>Rename Plates</div>
                <div>
                    <div>Prefix</div>
                    <div></div>
                </div>
                <div>
                    <div>Separator</div>
                    <div></div>
                </div>
                <div>
                    <div>padding</div>
                    <div></div>
                </div>
            </div>
            <div>
                <div>Manual Rename</div>
                <table>
                    <thead>
                        <tr>
                            <th>original</th>
                            <th>new</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inputPlateNames.filter(onlyUnique).map((origName, i) => {
                            return (
                                <tr key={origName}>
                                    <td>{origName}</td>
                                    <td>
                                        <input
                                            className="renameInputs"
                                            data-value={origName}
                                            data-first={!i ? 'first' : 'notfirst'}
                                            type="text"
                                            onChange={changePlateName}
                                            value={localRenamedPlates[origName]}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="f jcfe">
                <div className="button" onClick={reset}>
                    Reset
                </div>
                <div className="button" onClick={submit}>
                    Submit
                </div>
            </div>
        </div>
    );
};

export default RenamePlates;
