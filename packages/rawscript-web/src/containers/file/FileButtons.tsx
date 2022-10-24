import React, { FunctionComponent } from 'react';
import ButtonBar from '../../components/buttons/button-bar';
import UploadButton from '../../components/buttons/upload-button';
import { AnAction } from '../../common/types';

interface FileButtonsProps {
  path: string;
  importFiles: AnAction;
}

export const FileButtons: FunctionComponent<FileButtonsProps> = ({path, importFiles }) => {
  return (
    <ButtonBar right className="file__buttons">
      <UploadButton text="Import" action={importFiles} arg={{ path }} />
    </ButtonBar>
  );
};
