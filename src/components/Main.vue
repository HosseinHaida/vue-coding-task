<template>
  <q-page class="flex items-start">
    <div class="row justify-center q-py-sm full-width">
      <q-img
        class="border-top-left border-bottom-right"
        src="../assets/bg.png"
      />
    </div>
    <div class="row justify-between q-mt-md q-px-lg full-width">
      <q-btn
        v-for="(btn, i) in tickets"
        :key="i"
        unelevated
        :style="currentTicket === btn ? '' : borderClass"
        class="q-mx-md"
        :class="currentTicket === btn ? '' : 'text-black'"
        :color="currentTicket === btn ? 'positive' : ''"
        @click="currentTicket = btn"
      >
        {{ btn.time }} <br />
        {{ btn.price.toFixed(2) }} €
        <q-badge
          v-if="btn.remained <= 0"
          floating
          color="warning"
          square
          label="Sold Out!"
        />
        <q-badge
          v-else
          floating
          color="accent"
          square
          :label="btn.total - btn.remained"
        />
      </q-btn>
    </div>

    <div class="row justify-center q-my-lg full-width">
      Nur noch {{ remainedTickets }} tickets vorhanden.
    </div>

    <div class="row justify-center items-center q-mt-md full-width">
      <q-btn
        class="q-mx-md"
        push
        color="positive"
        style="font-weight: bold"
        label="+"
        @click="ticketSubtract()"
      />
      <div class="q-mx-lg">
        {{ totalTickets.count - remainedTickets }} Tickets
      </div>
      <q-btn
        class="q-mx-md"
        push
        color="positive"
        outline
        style="font-weight: bold"
        label="-"
        @click="ticketAdd()"
      />
    </div>

    <div class="row justify-center items-center q-mt-md full-width">
      {{ totalPrice }} €
    </div>

    <div
      class="row justify-center items-center self-end q-mt-md q-pb-lg full-width"
    >
      <q-btn rounded push color="orange" @click="bookClicked()">
        Jetzt Buchen
      </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      borderClass: {
        border: '3px solid #21BA45',
      },
      tickets: [
        { time: '10:00', price: 11.0, remained: 7, total: 7 },
        { time: '11:00', price: 12.0, remained: 6, total: 6 },
        // and other tickets could be listed here
      ],
      currentTicket: '',
      totalPrice: 0,
    }
  },
  computed: {
    remainedTickets() {
      let counter = 0

      this.tickets.forEach((loopTicket) => {
        counter += loopTicket.remained
      })

      return counter
    },
    totalTickets() {
      let counter = 0
      let price = 0

      this.tickets.forEach((loopTicket) => {
        counter += loopTicket.total
        price += loopTicket.price
      })

      return { count: counter, price: price }
    },
  },
  methods: {
    isNullTicket() {
      if (this.currentTicket === '') {
        this.showNotSelected()

        return true
      }
    },
    ticketAdd() {
      if (!this.isNullTicket() && this.currentTicket.time) {
        // This loop is because there may have been more tickets
        this.tickets.forEach((loopTicket) => {
          // When found the clicked ticket
          if (this.currentTicket.time === loopTicket.time) {
            // Dont allow more than total capacity
            if (loopTicket.remained < loopTicket.total) {
              loopTicket.remained++
              this.totalPrice = this.totalPrice - loopTicket.price
            }
          }
        })
      }
    },
    ticketSubtract() {
      if (!this.isNullTicket() && this.currentTicket.time) {
        // This loop is because there may have been more tickets
        this.tickets.forEach((loopTicket) => {
          // When found the clicked ticket
          if (this.currentTicket.time === loopTicket.time) {
            // Dont allow negative values
            if (loopTicket.remained > 0) {
              loopTicket.remained--
              this.totalPrice = this.totalPrice + loopTicket.price
            }
          }
        })
      }
    },
    showNotSelected() {
      this.$q.notify({
        message: 'No Tickets Selected!',
        caption: 'Please select one',
        color: 'negative',
        closeBtn: true,
      })
    },
    bookClicked() {
      // Booking TimeSlot at HH:MM, x tickets at YY,YY € succeeded
      let toBeBooked = []
      let totalPrice = 0

      this.tickets.forEach((loopTicket) => {
        if (loopTicket.remained !== loopTicket.total) {
          let string =
            ' ' +
            (loopTicket.total - loopTicket.remained).toString() +
            ' X ' +
            loopTicket.time +
            ' '

          toBeBooked.push(string)
          totalPrice =
            totalPrice +
            loopTicket.price * (loopTicket.total - loopTicket.remained)
        }
      })
      this.$q.notify({
        message: 'Bookings: ' + toBeBooked,
        caption: 'Total would be: ' + totalPrice + ' €',
        color: 'info',
        position: 'top',
      })
    },
  },
}
</script>

<style></style>
