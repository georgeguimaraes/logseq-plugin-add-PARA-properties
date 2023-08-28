import "@logseq/libs";
import { PageEntity } from "@logseq/libs/dist/LSPlugin.user";

async function add_para_properties(property: string) {
  const page = (await logseq.Editor.getCurrentPage()) as PageEntity;
  const blocks = await logseq.Editor.getCurrentPageBlocksTree();
  const first_block = blocks[0];

  const isEmpty =
    page.properties === undefined || Object.keys(page.properties).length === 0;

  console.log("properties:", page.properties);
  if (isEmpty) {
    const properties: Record<string, any> = {};
    properties[property] = "";

    await logseq.Editor.insertBlock(first_block.uuid, "", {
      properties: properties,
      sibling: true,
      before: true,
      focus: true,
      isPageBlock: true,
    });
  } else {
    await logseq.Editor.upsertBlockProperty(first_block.uuid, property, "");
    await logseq.Editor.editBlock(first_block.uuid);
  }
}

logseq
  .ready(() => {
    logseq.Editor.registerSlashCommand(
      "Project [file page under a project]",
      async (_) => {
        add_para_properties("project");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Area [file page under an area]",
      async (_) => {
        add_para_properties("area");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Resource [file page under a resource]",
      async (_) => {
        add_para_properties("resource");
      }
    );
  })
  .catch(console.error);
