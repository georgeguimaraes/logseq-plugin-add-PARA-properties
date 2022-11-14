import "@logseq/libs";
async function add_para_properties(property: string) {
  const page = logseq.Editor.getCurrentPage() as PageEntity;
  const blocks = logseq.Editor.getCurrentPageBlocksTree();
  const first_block = blocks[0];
  const p = property;
  console.log(page);
  console.log(p);

  if (page.properties) {
    await logseq.Editor.upsertBlockProperty(first_block.uuid, p, "");
  } else {
    await logseq.Editor.insertBlock(first_block.uuid, "", { before: true, properties: { p: ""}});
  }
}

logseq
.ready(() => {
  logseq.Editor.registerSlashCommand("Project [file page under a project]", async (e) => {
    add_para_properties("project");
  });
  logseq.Editor.registerSlashCommand("Area [file page under an area]", async (e) => {
    add_para_properties("area");
  });
  logseq.Editor.registerSlashCommand("Resource [file page under a resource]", async (e) => {
    add_para_properties("resource");
  });
})
.catch(console.error);
