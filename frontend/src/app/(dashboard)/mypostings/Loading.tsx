import React from 'react'
import { Container, Skeleton } from '@mui/material'

export default function Loading() {
    return (
        <Container maxWidth="lg" sx={{
            marginY: 5
        }}>
            <section className='flex flex-col gap-10'>
                <div className='flex md:flex-row flex-col gap-5 justify-start md:items-center md:justify-center shadow-md hover:shadow-lg transition-shadow p-[1rem] rounded-lg'>
                    <Skeleton variant="rounded" animation="wave" width={250} height={250} />
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
                <div className='flex md:flex-row flex-col gap-5 justify-start md:items-center md:justify-center shadow-md hover:shadow-lg transition-shadow p-[1rem] rounded-lg'>
                    <Skeleton variant="rounded" animation="wave" width={250} height={250} />
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
                <div className='flex md:flex-row flex-col gap-5 justify-start md:items-center md:justify-center shadow-md hover:shadow-lg transition-shadow p-[1rem] rounded-lg'>
                    <Skeleton variant="rounded" animation="wave" width={250} height={250} />
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
                <div className='flex md:flex-row flex-col gap-5 justify-start md:items-center md:justify-center shadow-md hover:shadow-lg transition-shadow p-[1rem] rounded-lg'>
                    <Skeleton variant="rounded" animation="wave" width={250} height={250} />
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
