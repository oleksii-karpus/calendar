import React, { AriaRole } from 'react';

export type LinkType = {
    to: string;
    children?: React.ReactNode;
    className?: string;
    title?: string;
    role?: AriaRole;
};
