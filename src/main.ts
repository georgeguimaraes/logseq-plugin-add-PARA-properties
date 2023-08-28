import "@logseq/libs";
import { PageEntity } from "@logseq/libs/dist/LSPlugin.user";

async function add_property_to_page(name: string, value: string) {
  const page = (await logseq.Editor.getCurrentPage()) as PageEntity;
  const blocks = await logseq.Editor.getCurrentPageBlocksTree();
  const first_block = blocks[0];

  const isEmpty =
    page.properties === undefined || Object.keys(page.properties).length === 0;

  if (isEmpty) {
    const properties: Record<string, any> = {};
    properties[name] = value;

    await logseq.Editor.insertBlock(first_block.uuid, "", {
      properties: properties,
      sibling: true,
      before: true,
      focus: true,
      isPageBlock: true,
    });
  } else {
    await logseq.Editor.upsertBlockProperty(first_block.uuid, name, value);
    await logseq.Editor.editBlock(first_block.uuid);
  }
}

async function file_page_under_para(property: string) {
  await add_property_to_page(property, "");
}

async function configure_page_type(type: string) {
  await add_property_to_page("page-type", type);
}

logseq
  .ready(() => {
    logseq.Editor.registerSlashCommand(
      "Project [file this page under a project]",
      async (_) => {
        file_page_under_para("project");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Area [file this page under an area]",
      async (_) => {
        file_page_under_para("area");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Resource [file this page under a resource]",
      async (_) => {
        file_page_under_para("resource");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Make this page a Project [using page-type]",
      async (_) => {
        configure_page_type("project");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Make this page an Area [using page-type]",
      async (_) => {
        configure_page_type("area");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Make this page a Resource [using page-type]",
      async (_) => {
        configure_page_type("resource");
      }
    );
  })
  .catch(console.error);
