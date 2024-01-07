import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react'
import _ from 'lodash'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IconButtonHover } from '@/components/IconButtonHover'
import { CiTrash } from 'react-icons/ci'
import { CustomButton } from '@/components/CustomButton'
import { cn } from '@/lib/utils'
import {
  CustomFile,
  RejectedFile,
} from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/NewProductForm'
import { Paragraph } from '@/components/text/Paragraph'
import { Heading3 } from '@/components/text/Heading3'

type Props = {
  selectedImages: CustomFile[]
  rejectedImages: RejectedFile[]
  setSelectedImages: Dispatch<SetStateAction<CustomFile[]>>
  setRejectedImages: Dispatch<SetStateAction<RejectedFile[]>>
}

export const Dropzone: FC<Props> = ({
  selectedImages,
  rejectedImages,
  setSelectedImages,
  setRejectedImages,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: RejectedFile[]) => {
      // Check if files are already added
      if (acceptedFiles?.length > 0 && selectedImages.length > 0) {
        // This method will mutate the acceptedFiles array
        _.pullAllBy(acceptedFiles, selectedImages, 'name')
      }

      if (selectedImages.length === 0) {
        setSelectedImages(() =>
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        )
      } else if (acceptedFiles.length > 0) {
        setSelectedImages((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        ])
      }

      if (rejectedFiles?.length) {
        // Check if files are already added to rejected
        if (rejectedImages.length > 0) {
          // This method will mutate the acceptedFiles array
          _.pullAllBy(rejectedFiles, rejectedImages, 'name')
        }

        if (rejectedImages.length === 0 || rejectedFiles.length > 0) {
          setRejectedImages((previousFiles) => [
            ...previousFiles,
            ...rejectedFiles,
          ])
        }
      }
    },
    [setSelectedImages, setRejectedImages, rejectedImages, selectedImages],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  })

  useEffect(() => {
    return () =>
      selectedImages.forEach((image) => URL.revokeObjectURL(image.preview))
  }, [selectedImages])

  const removeImageFromSelected = (name: string) => {
    setSelectedImages((files) => files.filter((file) => file.name !== name))
  }

  return (
    <div className='border border-borderColor p-4 rounded-lg'>
      <div
        {...getRootProps({
          className:
            'group mt-2 cursor-pointer flex items-center justify-center py-10 border-2 border-borderColor border-dashed rounded-md',
        })}
      >
        <input {...getInputProps()} />
        <div className=' flex flex-col items-center justify-center gap-4'>
          <AiOutlineCloudUpload
            size={28}
            className='group-hover:text-textHover'
          />
          {isDragActive ? (
            <Paragraph
              className='group-hover:text-textHover'
              value='Drop the files here ...'
            />
          ) : (
            <Paragraph
              className='group-hover:text-textHover'
              value='Drag & drop files here, or click to select files'
            />
          )}
        </div>
      </div>

      {/* Preview */}
      <div className='mt-10'>
        {/* Accepted images */}
        <Heading3
          fontSmall
          value={`Accepted images (${selectedImages.length})`}
        />
        {selectedImages?.length > 0 && (
          <div
            className={cn({
              'border-b border-borderColor': selectedImages.length,
            })}
          >
            <ul className='grid py-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-10'>
              {selectedImages.map((image, idx) => (
                <li
                  key={`${image.name}-${idx}`}
                  className='group relative w-32 rounded-md shadow-lg'
                >
                  <Image
                    src={image.preview}
                    alt={image.name}
                    width={100}
                    height={100}
                    className='h-full w-full object-contain rounded-md'
                  />
                  <IconButtonHover
                    items={[
                      {
                        onClick: () => removeImageFromSelected(image.name),
                        icon: <CiTrash size={28} />,
                      },
                    ]}
                  />
                </li>
              ))}
            </ul>
            <div className='flex justify-end mt-5'>
              <CustomButton
                fill='danger'
                type='button'
                className='mb-4'
                onClick={() => setSelectedImages([])}
                title='Remove all selected'
                disabled={selectedImages.length === 0}
              />
            </div>
          </div>
        )}

        {/* Rejected images */}
        <Heading3
          fontSmall
          className='text-lg py-4'
          value={`Rejected images (${rejectedImages.length})`}
        />
        <ul>
          {rejectedImages.map(({ file, errors }, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className='flex items-start justify-between'
            >
              <div>
                <p className='mt-2'>{file.name}</p>
                <ul className='text-danger'>
                  {errors.map((error, idx) => (
                    <li key={`${error.message}-${idx}`}>{error.message}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        {rejectedImages.length > 0 && (
          <div className='mt-6 flex justify-end gap-x-6'>
            <CustomButton
              fill='danger'
              type='button'
              onClick={() => setRejectedImages([])}
              title='Clear rejected'
            />
          </div>
        )}
      </div>
    </div>
  )
}
