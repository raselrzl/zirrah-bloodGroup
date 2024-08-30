
import Image from 'next/image'
import React from 'react'

const Success = async () => {
    return (
        <div className='flex flex-col items-center h-screen max-h-screen px-[5%]'>
                
                    <Image
                        src="/assets/images/success.gif"
                        height={300}
                        width={280}
                        alt="success"
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Your <span className="text-green-500">Blood Group</span> has
                        been successfully registered, Thank You being a part.
                    </h2>
            </div>
    )
}

export default Success