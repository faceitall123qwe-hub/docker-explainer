import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Spoken text; tech terms spelled phonetically so the Polish voice reads them naturally.
const lines = [
  "U mnie działa, a u ciebie nie? Inne wersje bibliotek, inny system. Doker kończy z tym problemem.",
  "Doker pakuje aplikację razem ze wszystkim, czego potrzebuje: kodem, bibliotekami i ustawieniami. Taka paczka to kontener.",
  "Jak kontener w porcie: nieważne, co jest w środku. Każdy dźwig i każdy statek obsłuży go tak samo.",
  "Maszyna wirtualna udaje cały komputer z własnym systemem. Kontener współdzieli jądro systemu gospodarza, więc startuje w sekundę i zajmuje mniej miejsca.",
  "Przepis na kontener zapisujesz w pliku dokerfajl: z jakiego obrazu startujesz, co kopiujesz, co instalujesz i co uruchomić.",
  "Z dokerfajla budujesz obraz, czyli szablon tylko do odczytu. Z jednego obrazu uruchomisz wiele kontenerów, jak wiele ciastek z jednej foremki.",
  "Obraz składa się z warstw. Gdy zmienisz tylko kod, Doker przebuduje ostatnią warstwę, a resztę weźmie z pamięci podręcznej.",
  "Gotowe obrazy trzymasz w rejestrze, na przykład Doker Hab. Doker pul pobiera obraz, a doker ran uruchamia go na dowolnym komputerze.",
  "Aplikacja to często kilka kontenerów: strona, baza danych i kesz. Doker kompołz uruchamia je wszystkie jedną komendą.",
  "Obraz, kontener, warstwy i rejestr. Tak działa Doker. Spróbuj sam: wpisz doker ran helou łorld.",
];

const only = process.argv[2] ? Number(process.argv[2]) : null;
const outRoot = "assets/audio";
mkdirSync(outRoot, { recursive: true });

for (let i = 0; i < lines.length; i++) {
  const n = String(i + 1).padStart(2, "0");
  if (only && only !== i + 1) continue;
  const tmp = join(outRoot, `tmp-${n}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  const tts = new MsEdgeTTS();
  await tts.setMetadata("pl-PL-MarekNeural", OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
    wordBoundaryEnabled: true,
  });
  await tts.toFile(tmp, lines[i], { rate: "+10%" });
  tts.close();
  for (const f of readdirSync(tmp)) {
    const ext = f.endsWith(".mp3") ? "mp3" : "json";
    renameSync(join(tmp, f), join(outRoot, `vo-${n}.${ext}`));
  }
  rmSync(tmp, { recursive: true, force: true });
  console.log(`vo-${n} ok`, existsSync(join(outRoot, `vo-${n}.mp3`)));
}
