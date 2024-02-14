'use client'

import {NextUIProvider} from '@nextui-org/react'

export function NextUIProv({children}: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}