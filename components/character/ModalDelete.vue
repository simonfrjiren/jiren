<script setup lang="ts">
import { deleteCharacter } from "~/services/api/chat/api";
import { ICharacter } from "~/services/api/chat/type";
import { toast } from "../ui/toast";

const props = defineProps<{ item: ICharacter; onDeleted: () => void }>();
const open = defineModel({
  default: false,
});

async function onDeleteClick() {
  // TODO
  const res = await deleteCharacter(props.item.id);
  if (res) {
    toast({
      description: "Delete character successfully",
      duration: 5000,
    });
    props.onDeleted();
  }
  open.value = false;
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="bg-[#131313] text-center border-none">
      <p class="text-[18px] lg:text-[24px] font-[500] text-center">
        Are you sure to delete <br />
        {{ item.name }}?
      </p>
      <p class="text-[#979797]">This action cannot be undone.</p>
      <div class="row-center w-full justify-center gap-4">
        <BaseButton
          text="Cancel"
          class="px-6"
          text-class="text-[#979797]"
          @click="open = false"
        />
        <BaseButton
          text="Delete"
          class="px-6 bg-[#fff]"
          text-class="text-[#131313]"
          @click="onDeleteClick"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>
