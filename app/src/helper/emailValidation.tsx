import React from 'react';

export const emailValidator = (email: string) => {
    const re: RegExp = /\S+@\S+\.\S+/;
    return re.test(email);
} 