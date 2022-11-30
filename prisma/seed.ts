import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // Users;
  await prisma.user.createMany({
    data: [
      {
        login: 'Billy',
        password: 'Bogisich',
        email: 'Keyon_Turner87@example.net',
        firstName: 'Billy',
        lastName: 'Bogisich',
        address: 'French Southern Territories',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Alicia',
        password: 'Wilkins',
        email: '38@example.net',
        firstName: 'Alicia',
        lastName: 'Wilkins',
        address: 'Iran',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Ginger',
        password: 'Greenfield',
        email: '2.Fritsch@example.com',
        firstName: 'Ginger',
        lastName: 'Greenfield',
        address: 'Monaco',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'admin',
        password: 'admin',
        email: '36@example.com',
        firstName: 'John',
        lastName: 'Wiza',
        address: 'Kyrgyz Republic',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Krystal',
        password: 'Boyer',
        email: '4_Blick74@example.org',
        firstName: 'Krystal',
        lastName: 'Boyer',
        address: 'Egypt',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Deborah',
        password: 'Gutmann',
        email: '63@example.net',
        firstName: 'Deborah',
        lastName: 'Gutmann',
        address: 'Russian Federation',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Hannah',
        password: 'McGlynn',
        email: '6_Moore@example.com',
        firstName: 'Hannah',
        lastName: 'McGlynn',
        address: 'Trinidad and Tobago',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Leslie',
        password: 'Schmidt',
        email: '7.Dibbert19@example.org',
        firstName: 'Leslie',
        lastName: 'Schmidt',
        address: 'Algeria',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Alexander',
        password: 'Erdman',
        email: '8.Conroy32@example.com',
        firstName: 'Alexander',
        lastName: 'Erdman',
        address: 'Saint Kitts and Nevis',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Olga',
        password: 'Zboncak',
        email: '9_Fay38@example.net',
        firstName: 'Olga',
        lastName: 'Zboncak',
        address: 'Slovenia',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Marion',
        password: 'Kemmer',
        email: '10.Leffler@example.org',
        firstName: 'Marion',
        lastName: 'Kemmer',
        address: 'Anguilla',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Adam',
        password: 'Bernhard',
        email: '16@example.net',
        firstName: 'Adam',
        lastName: 'Bernhard',
        address: 'Thailand',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Jodi',
        password: 'Miller',
        email: '12.Langosh36@example.net',
        firstName: 'Jodi',
        lastName: 'Miller',
        address: 'Mozambique',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
      {
        login: 'Jack',
        password: 'Connelly',
        email: '13_Hammes@example.net',
        firstName: 'Jack',
        lastName: 'Connelly',
        address: 'Rwanda',
        phoneNumber: null,
        birthDate: null,
        online: false,
      },
    ],
  });

  // feeds
  await prisma.feed.createMany({
    data: [
      { ownerId: 1 },
      { ownerId: 2 },
      { ownerId: 3 },
      { ownerId: 4 },
      { ownerId: 5 },
      { ownerId: 6 },
      { ownerId: 7 },
      { ownerId: 8 },
      { ownerId: 9 },
      { ownerId: 10 },
      { ownerId: 11 },
      { ownerId: 12 },
      { ownerId: 13 },
      { ownerId: 14 },
    ],
  });

  // Posts
  await prisma.post.createMany({
    data: [
      {
        views: 0,
        postText:
          'Numquam ab architecto. Enim labore id expedita beatae ab cupiditate iste vitae error. Eum neque amet deleniti eius vel nisi animi rerum. Sit debitis facilis quis autem aliquid animi itaque. Non qui et doloribus eum et.',
        feedId: 1,
        authorId: 1,
      },
      {
        views: 0,
        postText:
          'Quas id sit sit qui. Est modi necessitatibus reiciendis velit ad accusamus nam.',
        feedId: 1,
        authorId: 1,
      },
      {
        views: 0,
        postText:
          'Dicta fugiat et atque dolore dolor tempora nihil ea aspernatur. Quas enim repellendus doloremque eum maiores sit possimus aut fugit. Et autem voluptatibus autem consectetur consequuntur. Autem reiciendis iusto totam explicabo dolorem voluptatem et ut rerum. Consequuntur neque iste voluptatem magnam quia tempore eaque. Sint assumenda alias natus accusantium similique atque molestiae vero.',
        feedId: 2,
        authorId: 2,
      },
      {
        views: 0,
        postText:
          'Laudantium ut voluptas accusamus et. Id non sed sunt perspiciatis sed molestias perferendis. Maxime nemo quia voluptatibus incidunt accusantium. Et ducimus nesciunt error. Libero eligendi vel tempore quis ea. Totam eum voluptas repellendus voluptas quas.',
        feedId: 2,
        authorId: 2,
      },
      {
        views: 0,
        postText:
          'Nemo est ut sint omnis est eos deserunt. Perspiciatis amet nisi adipisci porro est tempora. Quia ut ut saepe quis ullam. Rerum in quos est laborum possimus quia unde et. Nam dolor similique. Ipsum ipsa omnis necessitatibus.',
        feedId: 3,
        authorId: 3,
      },
      {
        views: 0,
        postText:
          'Quia ea voluptatibus voluptatum. Consectetur occaecati illo facere fugiat provident aut et veniam itaque.',
        feedId: 3,
        authorId: 3,
      },
      {
        views: 0,
        postText:
          'Et quis sint. Illum culpa possimus vel pariatur architecto reprehenderit debitis.',
        feedId: 4,
        authorId: 4,
      },
      {
        views: 0,
        postText:
          'Natus voluptatem nihil. Consequuntur ut minima et et mollitia eaque necessitatibus et. Sit quidem eligendi. Qui illum qui non.',
        feedId: 4,
        authorId: 4,
      },
      {
        views: 0,
        postText:
          'Aspernatur et necessitatibus dignissimos aut aspernatur voluptas. Error non earum.',
        feedId: 5,
        authorId: 5,
      },
      {
        views: 0,
        postText:
          'Consequatur voluptas qui quia ducimus. Impedit reiciendis officia consequatur. Voluptatem consequatur corporis consequatur sapiente. Corporis commodi velit ut laboriosam doloremque.',
        feedId: 5,
        authorId: 5,
      },
      {
        views: 0,
        postText:
          'Unde cumque commodi vero. Maiores similique adipisci. Iure est dignissimos mollitia illo quia expedita. Incidunt vero porro dolores alias. Ab sed et.',
        feedId: 6,
        authorId: 6,
      },
      {
        views: 0,
        postText:
          'Aut quos accusamus repellendus cum rerum qui aliquid sed. Nihil sed dolorem fuga porro.',
        feedId: 6,
        authorId: 6,
      },
      {
        views: 0,
        postText: 'Omnis at omnis et. Hic omnis incidunt ut.',
        feedId: 7,
        authorId: 7,
      },
      {
        views: 0,
        postText:
          'Odit voluptatem qui voluptatem aut ipsam. Cupiditate et rem laudantium aut quas. Mollitia voluptatem culpa itaque non qui.',
        feedId: 7,
        authorId: 7,
      },
      {
        views: 0,
        postText:
          'Tenetur laudantium et quisquam non animi. Esse nostrum consequuntur similique voluptatem suscipit debitis minus est quam. Quis molestiae necessitatibus deleniti repellat delectus sequi eos quisquam. Odit dolor aut laborum. Quaerat aut quae porro vitae laborum asperiores iste.',
        feedId: 8,
        authorId: 8,
      },
      {
        views: 0,
        postText: 'Iusto quo quas. Enim est ut blanditiis quibusdam quam ea.',
        feedId: 8,
        authorId: 8,
      },
      {
        views: 0,
        postText:
          'Sit eveniet sit rerum. Rerum ipsam et cumque cumque aut esse sit.',
        feedId: 9,
        authorId: 9,
      },
      {
        views: 0,
        postText:
          'Animi adipisci natus est. Et corporis nobis adipisci blanditiis sequi assumenda illum sunt. Perferendis ea deserunt molestiae rem. Ad iusto saepe consequatur eum ea ut ducimus doloremque. Dolore fuga optio quis.',
        feedId: 9,
        authorId: 9,
      },
      {
        views: 0,
        postText:
          'Voluptatem assumenda veniam dolore omnis. Corporis perspiciatis consequuntur exercitationem est aut nihil quisquam. Quo vitae corrupti quod sed est nostrum consequatur labore nemo. Id sunt rerum expedita fugiat. Sint sit accusamus commodi tempore.',
        feedId: 10,
        authorId: 10,
      },
      {
        views: 0,
        postText:
          'Rerum voluptatem accusamus. Minima enim rem laudantium voluptatem. Molestiae ut necessitatibus est.',
        feedId: 10,
        authorId: 10,
      },
      {
        views: 0,
        postText:
          'Sit dolores eos rerum optio dicta delectus maxime odit praesentium. Facere sit saepe. Provident ipsa ullam in voluptatum repellendus tempore quis. Voluptatem sint odio quibusdam dolor rem eaque.',
        feedId: 11,
        authorId: 11,
      },
      {
        views: 0,
        postText:
          'Eveniet aut sit ex. Officia aspernatur aut quod odit odio vero est doloribus nulla. Praesentium officia dolores natus facilis.',
        feedId: 11,
        authorId: 11,
      },
      {
        views: 0,
        postText:
          'Qui rerum quod. Hic quo quia atque mollitia. Sed beatae accusantium ratione consequuntur possimus.',
        feedId: 12,
        authorId: 12,
      },
      {
        views: 0,
        postText:
          'Non nihil aut voluptate nesciunt velit fugiat mollitia atque. Suscipit occaecati id. Harum quam consectetur voluptates accusamus dignissimos tenetur. Quidem ullam sequi non culpa rerum et quidem numquam.',
        feedId: 12,
        authorId: 12,
      },
      {
        views: 0,
        postText:
          'Nihil consequatur qui. Mollitia nemo corrupti voluptatum nulla rerum.',
        feedId: 13,
        authorId: 13,
      },
      {
        views: 0,
        postText:
          'Quia voluptas illo dolorem dolores. Possimus repudiandae dolor. Reiciendis consequatur tenetur. Voluptatem nobis recusandae dicta illum et alias modi quos.',
        feedId: 13,
        authorId: 13,
      },
      {
        views: 0,
        postText:
          'Consequatur officiis maiores aut totam. Veniam nisi omnis veritatis et nobis laudantium.',
        feedId: 14,
        authorId: 14,
      },
      {
        views: 0,
        postText:
          'Aut est vitae reprehenderit qui architecto quia adipisci quasi. Sint est dolorem. Omnis in aut nihil quidem et omnis.',
        feedId: 14,
        authorId: 14,
      },
    ],
  });
  // dialogs
  await prisma.dialog.createMany({
    data: [
      { updatedAt: '2022-10-26T16:22:36.565Z' },
      { updatedAt: '2022-10-26T16:22:37.191Z' },
    ],
  });
  // Message
  await prisma.message.createMany({
    data: [
      {
        text: 'Repellendus quidem voluptas optio molestiae suscipit nulla minus rem suscipit accusantium soluta.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Eos quasi et et explicabo eos repellat excepturi doloribus.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Perspiciatis quidem quo iste dicta neque.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Sapiente aut.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Sit quis ea et ut voluptas maxime et consequatur.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Totam magni similique voluptatem rerum dolor incidunt quo voluptas.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Qui.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Quod vitae veritatis similique.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Quisquam veniam non nulla culpa optio officiis reprehenderit voluptatibus necessitatibus veritatis eligendi et vitae.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Quos et harum quaerat laboriosam rem tempore vel nostrum rerum et.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Necessitatibus doloribus voluptatem voluptatum at adipisci.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Rerum eaque.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Ipsa maxime perspiciatis eius quibusdam ducimus et maiores quae non voluptas.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Aut.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Fuga qui nihil labore et non odio quidem nisi.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Distinctio voluptatem eaque velit et maxime quasi.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Consequuntur voluptas quam ad officia accusamus voluptatem.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Et ipsa voluptatem consequatur ipsam provident qui atque sunt.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Quia porro sint.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Alias impedit dolores excepturi quasi fugit voluptatibus repellendus nesciunt numquam ut non.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Ut ut itaque sit eveniet non ad.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Dicta.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Aut totam nostrum dolorum aspernatur aut suscipit.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Aut expedita at ea id dolores expedita quia.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Reiciendis quia laboriosam possimus.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Recusandae voluptatem natus.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Aperiam blanditiis deserunt.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Et enim voluptatem quia excepturi voluptatem.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Occaecati velit quo necessitatibus autem recusandae earum numquam dolorum ut repudiandae iste temporibus.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Facilis quod delectus quis architecto sunt earum facere voluptatem tempora omnis assumenda suscipit.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Neque rem dignissimos voluptas.',
        unread: true,
        authorId: 5,
        dialogId: 1,
      },
      {
        text: 'Repellendus asperiores velit nobis.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Dignissimos enim omnis mollitia eligendi quod quaerat et ea consequuntur quo.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Iure autem.',
        unread: true,
        authorId: 4,
        dialogId: 1,
      },
      {
        text: 'Aut omnis quo voluptas ullam eum fugit nemo vel aliquid voluptates et iure.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Atque iure et nam dolor magnam itaque rem harum non corporis fuga distinctio.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Qui qui aut magni sint facere sequi qui sint.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Dicta impedit facere veniam et itaque inventore voluptates et laboriosam distinctio illum.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Qui suscipit ab aut non reiciendis dolorem mollitia laudantium molestiae a saepe.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Quod quae qui et sapiente illum temporibus quia dolore distinctio tempore dolorum.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Qui totam ullam.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Ea quas corporis ut nesciunt.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Eveniet quis illo velit libero quam illum ipsam recusandae cum rerum occaecati at et.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Non eius totam nihil quo ipsam maiores.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Accusamus labore rerum nostrum commodi aliquam sit culpa est temporibus incidunt reiciendis.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Blanditiis enim sed sapiente cumque pariatur et doloribus eaque amet.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Numquam architecto sunt delectus nisi dolores sapiente veniam quis qui.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Et accusamus omnis sed possimus.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Autem sequi molestias nihil.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Quasi expedita assumenda.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Qui esse vitae laborum quisquam autem laboriosam dolorem reprehenderit consequatur maiores est temporibus facere.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Dicta rem aspernatur et natus sed.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Minus dolores dolorem aut reprehenderit illum quas exercitationem quidem earum minus sed.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Aut cupiditate ea nesciunt aliquid explicabo officiis aliquam neque dolor quia eveniet voluptatem.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Et.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Odio veritatis at voluptatem et aperiam nihil.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Enim dicta ducimus aut ad totam aut sint aut est aspernatur.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Placeat qui et quo atque eum sapiente ad dolorem magnam nostrum porro natus.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Sapiente odio occaecati natus at velit aut delectus libero itaque qui.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Laudantium incidunt mollitia optio.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Suscipit labore illum dolores.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Ad voluptatem non laudantium consequuntur in exercitationem veniam.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Quis cumque quae qui nesciunt cupiditate est dolores quis id quos quo corrupti.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Laborum placeat maxime.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Et excepturi expedita ratione numquam sit ipsum quasi et dolor quos voluptatem aperiam ducimus.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
      {
        text: 'Earum ullam laborum vel iure magni dolorem.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Sed dignissimos quia dolor ut rem doloremque.',
        unread: true,
        authorId: 4,
        dialogId: 2,
      },
      {
        text: 'Doloremque sequi dolor corporis nam eaque corporis voluptatem dignissimos repellendus.',
        unread: true,
        authorId: 6,
        dialogId: 2,
      },
    ],
  });
  // Image
  await prisma.image.createMany({
    data: [
      {
        src: 'https://picsum.photos/seed/0.22455715310808766/1280/920',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.44543798161263237/947',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.5046808469456665/700/1280',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.13634536502107641/1280',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.6316084872888568/1280/590',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.18468078042840452/700/1280',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.6049633119992137/1280/329',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.5265710592882156/560',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.7775894231229743/947',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.6884816818004602/1280/329',
        uploaderId: 1,
      },
      {
        src: 'https://picsum.photos/seed/0.9431001600011457/1280/920',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.26292082668770145/947',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.33261083393226665/700/1280',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.1374049434813216/1280',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.09340886859101549/1280/590',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.41653554067184784/700/1280',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.21185985741608926/1280/329',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.2605049750677204/560',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.782616464809859/947',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.8271145044499995/1280/329',
        uploaderId: 2,
      },
      {
        src: 'https://picsum.photos/seed/0.34987029750095777/1280/920',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.7043842133514371/947',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.442095710398962/700/1280',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.9240861134296936/1280',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.9827052830643996/1280/590',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.912076234118351/700/1280',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.46590547527532555/1280/329',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.19953211265329718/560',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.2988795083117681/947',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.8372921542307932/1280/329',
        uploaderId: 3,
      },
      {
        src: 'https://picsum.photos/seed/0.08934466448831246/1280/920',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.45455241213744935/947',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.3699615282079918/700/1280',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.6055365437280533/1280',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.3838800973974845/1280/590',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.14473615414424867/700/1280',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.748012419886469/1280/329',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.7733678070580075/560',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.5173375601713541/947',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.9633749383879773/1280/329',
        uploaderId: 4,
      },
      {
        src: 'https://picsum.photos/seed/0.28327708142687924/1280/920',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.47665645951594215/947',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.6443690762238734/700/1280',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.5040995329612956/1280',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.8815444430020047/1280/590',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.2706148800925452/700/1280',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.15575808435904026/1280/329',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.5354428196045677/560',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.07847115158072082/947',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.3190607785542292/1280/329',
        uploaderId: 5,
      },
      {
        src: 'https://picsum.photos/seed/0.9780308373854332/1280/920',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.2549566461177397/947',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.5104061633124659/700/1280',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.7994519543238923/1280',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.43629552502567814/1280/590',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.09181138342194561/700/1280',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.8826820374355009/1280/329',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.116149892935969/560',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.5267079447415184/947',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.42556976882000686/1280/329',
        uploaderId: 6,
      },
      {
        src: 'https://picsum.photos/seed/0.9630028347815214/1280/920',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.6554064950007437/947',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.45321406670356623/700/1280',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.080982539552241/1280',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.010508702162165262/1280/590',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.44507854058490537/700/1280',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.09992020336448615/1280/329',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.6573015153993087/560',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.45999917577579263/947',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.70409612810478/1280/329',
        uploaderId: 7,
      },
      {
        src: 'https://picsum.photos/seed/0.017926876125443858/1280/920',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.07673152593344867/947',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.23134483957818253/700/1280',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.02565183399711035/1280',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.7923569639670889/1280/590',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.04755470175965204/700/1280',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.4219057164028488/1280/329',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.14785519520124746/560',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.8966278640192966/947',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.0176194630664972/1280/329',
        uploaderId: 8,
      },
      {
        src: 'https://picsum.photos/seed/0.919178526609638/1280/920',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.933935795632606/947',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.607156946890449/700/1280',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.14643732505664575/1280',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.862311766865562/1280/590',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.6632645504857078/700/1280',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.2234120723923092/1280/329',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.49737476541764325/560',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.5922171855233087/947',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.7932800221540963/1280/329',
        uploaderId: 9,
      },
      {
        src: 'https://picsum.photos/seed/0.5490036300951802/1280/920',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.7661545965126886/947',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.05666950631886669/700/1280',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.8460520590704934/1280',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.9994001583252281/1280/590',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.7489907261690891/700/1280',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.1516633512040051/1280/329',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.2923092635941833/560',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.4228861333210536/947',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.15146636977454575/1280/329',
        uploaderId: 10,
      },
      {
        src: 'https://picsum.photos/seed/0.5974271211710938/1280/920',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.08950852995698777/947',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.9465820176001916/700/1280',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.5813845919562477/1280',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.8439771824205025/1280/590',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.5664837201443935/700/1280',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.6198403647396147/1280/329',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.4825903718079092/560',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.6032826301345238/947',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.5295939922374941/1280/329',
        uploaderId: 11,
      },
      {
        src: 'https://picsum.photos/seed/0.9594311983220825/1280/920',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.5392150101656599/947',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.7614953207772879/700/1280',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.2700370614650722/1280',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.28714809488649706/1280/590',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.6831908981661208/700/1280',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.08331345869263362/1280/329',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.7604795066273164/560',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.830969096744872/947',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.3862430401867778/1280/329',
        uploaderId: 12,
      },
      {
        src: 'https://picsum.photos/seed/0.4825668772964997/1280/920',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.31712016395390763/947',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.8366492970562367/700/1280',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.6653866979011653/1280',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.5370594211943451/1280/590',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.863643407002854/700/1280',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.6555201950159524/1280/329',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.30455997175892846/560',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.736586015073244/947',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.8099081805869313/1280/329',
        uploaderId: 13,
      },
      {
        src: 'https://picsum.photos/seed/0.6088044091198102/1280/920',
        uploaderId: 14,
      },
      {
        src: 'https://picsum.photos/seed/0.24734118638948832/947',
        uploaderId: 14,
      },
      {
        src: 'https://picsum.photos/seed/0.11436220715016998/700/1280',
        uploaderId: 14,
      },
      {
        src: 'https://picsum.photos/seed/0.04318131930432867/1280',
        uploaderId: 14,
      },
      {
        src: 'https://picsum.photos/seed/0.17824509549662393/1280/590',
        uploaderId: 14,
      },
      {
        src: 'https://picsum.photos/seed/0.42116299899831144/700/1280',
        uploaderId: 14,
      },
      {
        src: 'https://picsum.photos/seed/0.9767006321217244/1280/329',
        uploaderId: 14,
      },
      {
        src: 'https://picsum.photos/seed/0.39389693227439326/560',
        uploaderId: 14,
      },
      {
        src: 'https://picsum.photos/seed/0.051065752190956104/947',
        uploaderId: 14,
      },
      {
        src: 'https://picsum.photos/seed/0.7145628776223387/1280/329',
        uploaderId: 14,
      },
    ],
  });

  // avatar

  await prisma.avatar.createMany({
    data: [
      { userId: 1, imageId: 1 },
      { userId: 2, imageId: 11 },
      { userId: 3, imageId: 21 },
      { userId: 4, imageId: 31 },
      { userId: 5, imageId: 41 },
      { userId: 6, imageId: 51 },
      { userId: 7, imageId: 61 },
      { userId: 8, imageId: 71 },
      { userId: 9, imageId: 81 },
      { userId: 10, imageId: 91 },
      { userId: 11, imageId: 101 },
      { userId: 12, imageId: 111 },
      { userId: 13, imageId: 121 },
      { userId: 14, imageId: 131 },
    ],
  });

  // dialogs to user
  await prisma.user.update({
    where: { id: 1 },
    data: { friends: { connect: [{ id: 2 }] } },
  });
  await prisma.user.update({
    where: { id: 2 },
    data: { friends: { connect: [{ id: 3 }, { id: 1 }] } },
  });
  await prisma.user.update({
    where: { id: 3 },
    data: {
      friends: {
        connect: [{ id: 2 }, { id: 5 }, { id: 8 }, { id: 12 }, { id: 14 }],
      },
    },
  });
  await prisma.user.update({
    where: { id: 4 },
    data: {
      friends: {
        connect: [{ id: 3 }, { id: 7 }, { id: 6 }, { id: 11 }, { id: 14 }],
      },
      dialogs: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });
  await prisma.user.update({
    where: { id: 5 },
    data: {
      friends: { connect: [{ id: 3 }, { id: 6 }, { id: 12 }] },
      dialogs: {
        connect: [{ id: 1 }],
      },
    },
  });
  await prisma.user.update({
    where: { id: 6 },
    data: {
      friends: { connect: [{ id: 5 }, { id: 4 }, { id: 8 }, { id: 13 }] },
      dialogs: {
        connect: [{ id: 2 }],
      },
    },
  });
  await prisma.user.update({
    where: { id: 7 },
    data: { friends: { connect: [{ id: 4 }, { id: 12 }, { id: 13 }] } },
  });
  await prisma.user.update({
    where: { id: 8 },
    data: {
      friends: {
        connect: [{ id: 9 }, { id: 6 }, { id: 3 }, { id: 13 }, { id: 14 }],
      },
    },
  });
  await prisma.user.update({
    where: { id: 9 },
    data: { friends: { connect: [{ id: 8 }, { id: 11 }, { id: 10 }] } },
  });
  await prisma.user.update({
    where: { id: 10 },
    data: { friends: { connect: [{ id: 9 }, { id: 12 }, { id: 13 }] } },
  });
  await prisma.user.update({
    where: { id: 11 },
    data: { friends: { connect: [{ id: 4 }, { id: 9 }, { id: 13 }] } },
  });
  await prisma.user.update({
    where: { id: 12 },
    data: {
      friends: {
        connect: [{ id: 14 }, { id: 3 }, { id: 7 }, { id: 10 }, { id: 5 }],
      },
    },
  });
  await prisma.user.update({
    where: { id: 13 },
    data: {
      friends: {
        connect: [{ id: 10 }, { id: 11 }, { id: 8 }, { id: 6 }, { id: 7 }],
      },
    },
  });
  await prisma.user.update({
    where: { id: 14 },
    data: {
      friends: { connect: [{ id: 12 }, { id: 3 }, { id: 8 }, { id: 4 }] },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log('SEED ERROR');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
