import choki from "chokidar";

export function watchFileChange(path: string) {
  const watcher = choki.watch(path, {
    ignoreInitial: true,
  });

  watcher.on("change", (path) => {
    console.log(`File ${path} has been changed`);
  });
}
