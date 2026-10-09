"use client";
import dynamic from "next/dynamic";
import Placeholder from "./Placeholder";
import { Base64Tool, UrlTool } from "./EncodingTools";
import { UuidGenerator, HashGenerator, RandomNumber } from "./GeneratorTools";
import { TextCounter, CaseConverter, RemoveDuplicates, TextFormatter } from "./TextTools";
import { ColorPicker, TimestampConverter, UnitConverter, Calculator, IpInformation, UserAgentParser, JwtDecoder } from "./UtilityTools";
const JsonFormatter = dynamic(() => import("./JsonFormatter"));
const QrGenerator = dynamic(() => import("./QrGenerator"));
const PasswordGenerator = dynamic(() => import("./PasswordGenerator"));
const WhatsAppChecker = dynamic(() => import("./WhatsAppChecker"));
const TikTokDownloader = dynamic(() => import("./TikTokDownloader"));
const ImageTools = dynamic(() => import("./ImageTools"));
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
export function getToolComponent(slug: string) {
  return TOOL_COMPONENTS[slug] || (() => <Placeholder slug={slug} />);
}
