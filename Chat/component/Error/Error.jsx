import React from 'react'
import Style from './Error.module.css'

const Error = ({error}) => {
    return
     (
        <div classname={Style.Error}>
            <div classname = {Style.Error_box}>
                <h1>
                    Please Fix this error & reload
                </h1>
                {error}
            </div>

        </div>

     )
}
export default Error