// Réglages Android appliqués après "npx cap add android" (le dossier android/ est recréé à chaque build).
// 1) barres système (heure/batterie en haut, navigation en bas) en noir pur
// 2) écran de démarrage noir avec le logo
// 3) icône à thème Material You (monochrome) pour Android 13+
const fs = require("fs");
const path = require("path");

const res = path.join(__dirname, "..", "android", "app", "src", "main", "res");

function patchFile(file, transform) {
  const p = path.join(res, file);
  const before = fs.readFileSync(p, "utf8");
  const after = transform(before);
  if (after === before) throw new Error(`Rien n'a été modifié dans ${file}`);
  fs.writeFileSync(p, after);
  console.log(`✓ ${file}`);
}

// 1 et 2 : thèmes
patchFile("values/styles.xml", (xml) =>
  xml
    .replace(
      /(<style name="AppTheme\.NoActionBar"[^>]*>)/,
      `$1
        <item name="android:statusBarColor">#000000</item>
        <item name="android:navigationBarColor">#000000</item>
        <item name="android:windowLightStatusBar">false</item>
        <item name="android:windowBackground">#000000</item>`
    )
    .replace(
      /<style name="AppTheme\.NoActionBarLaunch" parent="Theme\.SplashScreen">[\s\S]*?<\/style>/,
      `<style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="windowSplashScreenBackground">#000000</item>
        <item name="windowSplashScreenAnimatedIcon">@mipmap/ic_launcher_foreground</item>
        <item name="postSplashScreenTheme">@style/AppTheme.NoActionBar</item>
        <item name="android:statusBarColor">#000000</item>
        <item name="android:navigationBarColor">#000000</item>
        <item name="android:windowBackground">#000000</item>
    </style>`
    )
);

// 3 : icône monochrome
const drawableDir = path.join(res, "drawable-nodpi");
fs.mkdirSync(drawableDir, { recursive: true });
fs.copyFileSync(path.join(__dirname, "..", "resources", "monochrome.png"), path.join(drawableDir, "ic_launcher_monochrome.png"));
console.log("✓ drawable-nodpi/ic_launcher_monochrome.png");

for (const file of ["mipmap-anydpi-v26/ic_launcher.xml", "mipmap-anydpi-v26/ic_launcher_round.xml"]) {
  if (!fs.existsSync(path.join(res, file))) continue;
  patchFile(file, (xml) =>
    xml.includes("<monochrome")
      ? xml
      : xml.replace(
          "</adaptive-icon>",
          `    <monochrome>
        <inset android:drawable="@drawable/ic_launcher_monochrome" android:inset="16.7%" />
    </monochrome>
</adaptive-icon>`
        )
  );
}

// 4 : le clavier redimensionne l'app au lieu de faire glisser toute la fenêtre
{
  const manifest = path.join(__dirname, "..", "android", "app", "src", "main", "AndroidManifest.xml");
  const xml = fs.readFileSync(manifest, "utf8");
  if (!xml.includes("windowSoftInputMode")) {
    const out = xml.replace('android:name=".MainActivity"', 'android:name=".MainActivity"\n            android:windowSoftInputMode="adjustResize"');
    if (out === xml) throw new Error("MainActivity introuvable dans AndroidManifest.xml");
    fs.writeFileSync(manifest, out);
  }
  console.log("✓ AndroidManifest.xml (clavier)");
}
