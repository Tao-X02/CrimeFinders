import React from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
}


export default function PhotoCroppper({imagePreview, setCropper}: Props) {
    return (
        <Cropper 
            src={imagePreview}
            preview='.img-preview'
            guides={false}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}