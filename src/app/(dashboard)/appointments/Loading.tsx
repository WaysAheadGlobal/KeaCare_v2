import React from 'react'
import { Container, Skeleton } from '@mui/material'

export default function Loading() {
    return (
        <Container maxWidth="lg" sx={{
            marginY: 5
        }}>
            <section className='flex flex-col gap-10'>
                <div className='flex flex-row items-center justify-center gap-5 shadow-lg p-[1rem]'>
                    <Skeleton variant="rounded" animation="wave" width={300} height={300} />
                    <div className='flex-grow space-y-1'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                    </div>
                    <div className='flex-grow space-y-1'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                    </div>
                    <div className='flex-grow space-y-4'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" width={"100%"} sx={{
                            paddingY: 3
                        }} />
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-5 shadow-lg p-[1rem]'>
                    <Skeleton variant="rounded" animation="wave" width={300} height={300} />
                    <div className='flex-grow space-y-1'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                    </div>
                    <div className='flex-grow space-y-1'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                    </div>
                    <div className='flex-grow space-y-4'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" width={"100%"} sx={{
                            paddingY: 3
                        }} />
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-5 shadow-lg p-[1rem]'>
                    <Skeleton variant="rounded" animation="wave" width={300} height={300} />
                    <div className='flex-grow space-y-1'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                    </div>
                    <div className='flex-grow space-y-1'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                    </div>
                    <div className='flex-grow space-y-4'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" width={"100%"} sx={{
                            paddingY: 3
                        }} />
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-5 shadow-lg p-[1rem]'>
                    <Skeleton variant="rounded" animation="wave" width={300} height={300} />
                    <div className='flex-grow space-y-1'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                    </div>
                    <div className='flex-grow space-y-1'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" />
                    </div>
                    <div className='flex-grow space-y-4'>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton variant="rounded" animation="wave" width={"100%"} sx={{
                            paddingY: 3
                        }} />
                    </div>
                </div>
            </section>
        </Container>
    )
}
