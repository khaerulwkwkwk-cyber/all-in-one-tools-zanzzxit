"use client";
import Placeholder from "./Placeholder";
import JsonFormatter from "./JsonFormatter";
import QrGenerator from "./QrGenerator";
import PasswordGenerator from "./PasswordGenerator";
import WhatsAppChecker from "./WhatsAppChecker";
import TikTokDownloader from "./TikTokDownloader";
import ImageTools from "./ImageTools";
import { Base64Tool, UrlTool } from "./EncodingTools";
import { UuidGenerator, HashGenerator, RandomNumber } from "./GeneratorTools";
import { TextCounter, CaseConverter, RemoveDuplicates, TextFormatter } from "./TextTools";
import {
  ColorPicker,
  TimestampConverter,
  UnitConverter,
  Calculator,
  IpInformation,
  UserAgentParser,
  JwtDecoder,
} from "./UtilityTools";

export const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatter,
  "qr-generator": QrGenerator,
  "password-generator": PasswordGenerator,
  "whatsapp-checker": WhatsAppChecker,
  "whatsapp-status": WhatsAppChecker,
  "tiktok-downloader": TikTokDownloader,
  "image-tools": ImageTools,
  "base64-encoder": () => <Base64Tool mode="encode" />,
  "base64-decoder": () => <Base64Tool mode="decode" />,
  "url-encoder": () => <UrlTool mode="encode" />,
  "url-decoder": () => <UrlTool mode="decode" />,
  "uuid-generator": UuidGenerator,
  "hash-generator": HashGenerator,
  "random-number": RandomNumber,
  "text-counter": TextCounter,
  "case-converter": CaseConverter,
  "remove-duplicates": RemoveDuplicates,
  "text-formatter": TextFormatter,
  "color-picker": ColorPicker,
  "timestamp-converter": TimestampConverter,
  "unit-converter": UnitConverter,
  "calculator": Calculator,
  "ip-information": IpInformation,
  "user-agent": UserAgentParser,
  "jwt-decoder": JwtDecoder,
};

export function getToolComponent(slug: string): React.ComponentType {
  const Comp = TOOL_COMPONENTS[slug];
  if (Comp) return Comp;
  return function PlaceholderWrapper() {
    return <Placeholder slug={slug} />;
  };
}
