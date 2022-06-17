import React, { ChangeEvent, MouseEvent, DetailedHTMLProps, InputHTMLAttributes, useState, useRef } from 'react';
import styles from './AppInputFile.module.css';
import { Portal } from '../Portal';
import { toast } from 'react-toastify';

type DefaultInputPropsType = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type' | 'id' | 'name' | 'onChange' | 'value'>;

type AppInputFilePropsType = {
  id: string;
  name: string;
  onChange?: (files: File[] | null) => void;
  value?: string | null;
} & DefaultInputPropsType;

const dt = new DataTransfer();

export const AppInputFile: React.FC<AppInputFilePropsType> = ({ id, name, onChange, value, ...restProps }) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hundleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    /** TODO validation accept */
    // const lastFile = evt.currentTarget.files && evt.currentTarget.files[evt.currentTarget.files.length - 1];

    // if (lastFile && restProps.accept && !lastFile.type.match(restProps.accept)) {
    //   toast.error(`File must be of type ${restProps.accept}`);
    //   return;
    // }

    const inputFiles = evt.currentTarget.files;

    if (inputFiles && inputFiles.length) {
      Array.from(inputFiles).forEach((file) => dt.items.add(file));
      setFiles(() => {
        const files = Array.from(inputFiles);
        onChange && onChange(files);
        return files;
      });
    }
  };

  const hundleFileRemove = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const clickedFileName = evt.currentTarget.dataset.id;

    if (files) {
      setFiles(() => {
        const filteredFiles = files.filter((file, i) => {
          if (file.name !== clickedFileName) {
            return true;
          }

          dt.items.remove(i);
          return false;
        });

        if (inputRef.current) {
          inputRef.current.files = dt.files;
        }

        onChange && onChange(filteredFiles);

        return filteredFiles;
      });
    }
  };

  const label = files?.length
    ? files.map((file) => (
      <p key={ file.name } className={ styles.file }>
        <span>{ file.name }</span>
        <button
          data-id={ file.name }
          type="button"
          className={ styles.closeButton }
          onClick={ hundleFileRemove }
        />
      </p>
    ))
    : '+ Attach file'

  return (
    <div>
      <label className={styles.label} htmlFor={id}>{ label }</label>
      <input ref={inputRef} className={styles.input} type="file" id={id} name={name} onChange={hundleFileChange} {...restProps} />
    </div>
  );
};
