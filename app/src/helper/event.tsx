import React from 'react';

export const onInputChange = (
    dispatch: React.Dispatch<React.SetStateAction<string>>
) => (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(event.currentTarget.value);
};

export const updateBooleanState = (dispatch: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    return () => dispatch(value);
}

export const onTextAreaChange = (
    dispatch: React.Dispatch<React.SetStateAction<string>>
) => (event: React.FormEvent<HTMLTextAreaElement>) => {
    dispatch(event.currentTarget.value);
};

export const onSelectChange = (
    dispatch: React.Dispatch<React.SetStateAction<string>>
) => (event: React.FormEvent<HTMLSelectElement>) => {
    dispatch(event.currentTarget.value);
};