import React from 'react';
import FormDrawer from './FormDrawer'
import FormDialog from './FormDialog'
import { FormPopupProps } from './entity';


const FormPopup: React.FC<FormPopupProps> = (props) => {

    const type = props.type ? props.type : 'drawer'

    return type === 'drawer' ? <FormDrawer
        {...props}>
        {props.children}
    </FormDrawer> : <FormDialog
        {...props}>
            {props.children}
        </FormDialog>

}

export default FormPopup;