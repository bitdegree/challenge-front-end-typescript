import { Subject } from "rxjs";

/**Message Interfaces for in app alert messages */
interface BitdegMessage {
  id?: number;
  code?: string;
  message: string;
  type: MessageType;
  alertDuration?: number;
}

interface BitdegMessageRef {
  message: BitdegMessage;
  afterClose: Subject<any>;
  hide: () => void;
}

type MessageType = "error" | "info" | "success" | "warn" | "light";

export { BitdegMessage, MessageType, BitdegMessageRef };
