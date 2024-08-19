import {
  Dispatch,
  FC,
  MouseEvent,
  PropsWithChildren,
  SetStateAction,
} from "react";
import { Button, Modal } from "antd";

interface props extends PropsWithChildren {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => boolean;
  title?: string;
  loading?: boolean;
  showButton?: boolean;
  showCancelButton?: boolean;
}

export const HalloModal: FC<props> = ({
  open,
  setOpen,
  children,
  onOk,
  title = "Basic Modal",
  loading = false,
  showButton = true,
  showCancelButton = true,
}) => {
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: MouseEvent<HTMLButtonElement>) => {
    if (onOk) {
      const ok = onOk(e);

      if (!ok) return;

      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const footer = [
    {
      hide: !showCancelButton,
      button: (
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>
      ),
    },
    {
      hide: false,
      button: (
        <Button key="ok" type="primary" onClick={handleOk} loading={loading}>
          Ok
        </Button>
      ),
    },
  ];

  return (
    <>
      {showButton && (
        <Button type="primary" onClick={showModal}>
          Start play
        </Button>
      )}
      <Modal
        loading={loading}
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={footer.filter(({ hide }) => !hide).map(({ button }) => button)}
      >
        {children}
      </Modal>
    </>
  );
};
